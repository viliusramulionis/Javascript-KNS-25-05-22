import express from 'express'
import database from '../database/connect.js'

const router = express.Router();

router.get("/register", (req, res) => {
    const message = req.query.message;
    res.render("register", message);
});

router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        await database.query(
            "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
            [first_name, last_name, email, password]
        );
        res.redirect("/", { message: "Sveiki prisiregistravę" });
    } catch (error) {
        return res.redirect("/?message=Sveiki prisiregistravę");
    }
});

export default router