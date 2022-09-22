import express from 'express'
import db from '../database/connect.js'
import { ratingsValidator } from '../middleware/validate.js'

const router = express.Router()

router.post('/worker/:wid/order/:oid', ratingsValidator, async (req, res) => {
    //Laikinas sprendimas
    const userId = 1

    req.body.workerId = req.params.wid
    req.body.orderId = req.params.oid
    req.body.userId = userId

    try {
        await db.Ratings.create(req.body)
        res.send('Įvertinimas sėkmingai išsaugotas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko serverio klaida')
    }
})

export default router