import express from 'express'
import db from '../database/connect.js'
import upload from '../middleware/multer.js'
import { workersValidator } from '../middleware/validate.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
        const workers = await db.Workers.findAll()
        res.json(workers)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.post('/new', upload.single('photo'), workersValidator, async (req, res) => {
    try {
        req.body.photo = '/uploads/' + req.file.filename

        await db.Workers.create(req.body)
        res.send('Darbuotojas sėkmingai išsaugotas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.put('/edit/:id', upload.single('photo'), workersValidator, async (req, res) => {
    try {
        if(req.file)
            req.body.photo = '/uploads/' + req.file.filename

        const worker = await db.Workers.findByPk(req.params.id)
        await worker.update(req.body)
        res.send('Darbuotojas sėkmingai atnaujintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
        const worker = await db.Workers.findByPk(req.params.id)
        await worker.destroy()
        res.send('Darbuotojas sėkmingai ištrintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router