
import express from 'express';
import auth from '../middleware/auth.js';
import database from '../database/connect.js'
import { upload } from '../middleware/upload.js'

const router = express.Router();

router.get("/playlists", auth, async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect("/");
    }
    const user = req.session.user;
    const playlists = await database.query(
        "SELECT id, playlist_name, image FROM playlists WHERE user_id = ?",
        [user]
    );
    res.render("playlists", { playlists: playlists[0] });
});

router.post("/playlists", upload.single("image"), async (req, res) => {
    const { playlist_name } = req.body;
    const user = req.session.user;
    const image = req.file ? req.file.filename : "";
    await database.query(
        "INSERT INTO playlists (playlist_name, image, user_id) VALUES (?, ?, ?)",
        [playlist_name, image, user]
    );
    res.redirect("/playlists");
});

router.get("/delete/playlists/:id", auth, async (req, res) => {
    const id = req.params.id;
    await database.query(`DELETE FROM playlists WHERE id = ${id}`);
    res.redirect("/playlists");
});

// EDIT PLAYLIST

router.get("/editPlaylist/:id", auth, async (req, res) => {
    const id = req.params.id;
    const playlist = await database.query(
        `SELECT id, playlist_name, image FROM playlists WHERE id = ${id}`
    );
    const playlistObj = playlist[0][0];
    res.render("editPlaylist", playlistObj);
});

router.post(
    "/editPlaylist/:id",
    auth,
    upload.single("image"),
    async (req, res) => {
        const id = req.params.id;
        const { playlist_name } = req.body;
        const image = req.file ? req.file.filename : "";
        await database.query(
            "UPDATE playlists SET playlist_name = ?, image = ? WHERE id = ?",
            [playlist_name, image, id]
        );

        res.redirect("/playlists");
    }
);

export default router