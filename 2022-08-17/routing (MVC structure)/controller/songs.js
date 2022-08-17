import express from 'express'
import database from '../database/connect.js'
import auth from '../middleware/auth.js'

const router = express.Router();

router.get("/", async (req, res) => {
    const message = req.query.message;
    const songs = await database.query(
        "SELECT id, artist_name, song_Name, song_Album FROM songs"
    );

    const playlists = await database.query(
        "SELECT id, playlist_name, image FROM playlists"
    );

    res.render("indexUnauth", {
        songs: songs[0],
        playlists: playlists[0],
        message,
    });
});

//DELETE

router.get("/delete/:id", auth, async (req, res) => {
    const id = req.params.id;
    await database.query(`DELETE FROM songs WHERE id = ${id}`);
    res.redirect("/songs");
});

//UPDATE

router.get("/edit/:id", auth, async (req, res) => {
    const id = req.params.id;
    const song = await database.query(
        `SELECT id, artist_name, song_Name, song_Album FROM songs WHERE id = ${id}`
    );
    const zong = song[0][0];

    res.render("edit", zong);
});

router.post("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const { song_Name, song_Album } = req.body;
    await database.query(
        "UPDATE songs SET song_Name = ?, song_Album = ? WHERE id = ?",
        [song_Name, song_Album, id]
    );
    res.redirect("/");
});

//ADD PLAYLIST


// SONGS
router.get("/songs", auth, async (req, res) => {
    const songs = await database.query(
        "SELECT id, artist_name, song_Name, song_Album FROM songs"
    );

    const playlists = await database.query(
        "SELECT id, playlist_name FROM playlists WHERE user_id = ?",
        [req.session.user]
    );
    console.log(playlists[0]);
    res.render("songs", { songs: songs[0], playlists: playlists[0] });
});

router.post("/songs", auth, async (req, res) => {
    const { user_id, artist_name, song_Name, song_Album } = req.body;
    console.log(req.body);
    try {
        await database.query(
            "INSERT INTO songs (playlist_id, artist_name, song_Name, song_Album) VALUES (?, ?, ?, ?)",
            [user_id, artist_name, song_Name, song_Album]
        );
        res.redirect("/songs");
    } catch (error) {
        return res.redirect("/songs/?message=tokia reikmse yra");
    }
});

export default router