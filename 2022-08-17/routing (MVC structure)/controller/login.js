import express from 'express';
import database from '../database/connect.js'

const router = express.Router();

router.get("/login", async (req, res) => {
    res.render("login");
});

router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const login = await database.query(
            `SELECT * FROM users WHERE email = '${email}' AND password='${password}'`
        );
        if (login[0].length !== 0) {
            req.session.user = login[0][0].id;
            req.session.loggedIn = true;
            return res.redirect("/?message=Sveiki prisijungę");
        } else
            return res.redirect("/?message=Neteisingas slaptažodis arba el.pastas");
    } catch (error) {
        return res.redirect("/?message=Neteisingas slaptažodis arba el.pastas");
    }
});

export default router