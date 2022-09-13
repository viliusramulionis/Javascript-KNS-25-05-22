import express from 'express'
import db from '../database/connect.js'
import { ratingsValidator } from '../middleware/validate.js'

const router = express.Router()

router.post('/worker/:id', ratingsValidator, async (req, res) => {
    req.body.workerId = req.params.id

    try {
        await db.Ratings.create(req.body)
        res.send('Įvertinimas sėkmingai išsaugotas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko serverio klaida')
    }
})

export default router