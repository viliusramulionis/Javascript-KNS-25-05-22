import express from 'express'
import bcrypt from 'bcrypt'
import db from '../database/connect.js'

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const userExists = await db.Users.findOne({ 
            where: { 
                email: req.body.email 
            } 
        })
        
        if(userExists) {
            res.status(401).send('Toks vartotojas jau egzistuoja')
            return
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)

        await db.Users.create(req.body)
        res.send('Vartotojas sėkmingai sukurtas')
    } catch(error) {
        console.log(error)
        res.status(418).send('Įvyko serverio klaida')
    }
})

export default router