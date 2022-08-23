import express from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connect.js'

const router = express.Router()

const saltRounds = 10

router.post('/register', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10)

    try {
        await db.Users.create(req.body)
        res.json({message: 'Vartotojas sėkmingai sukurtas'})
    } catch {
        res.status(400).json({message: 'Registracija nepavyko'})
    }
})

export default router