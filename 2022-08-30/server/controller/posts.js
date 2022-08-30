import express from 'express'
import db from '../database/connect.js'
import { auth } from '../middleware/auth.js'
import upload from '../middleware/multer.js'
import { postValidator } from '../middleware/validate.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const posts = await db.Posts.findAll()
        res.json(posts)
    } catch {
        //Pirmas variantas grąžinti tik statusą
        //res.status(500).end()

        //Antras variantas grąžinti tik statusą
        //res.sendStatus(500)

        res.status(500).send('Įvyko serverio klaida')
    }
})

router.get('/:id', async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        res.json(post)
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

//Naujo įrašo pridėjimas

router.post('/', auth, upload.single('image'), postValidator, async (req, res) => {
    try {
        if(req.file)
            req.body.image = '/uploads/' + req.file.filename
            
        new db.Posts(req.body).save()
        res.send('Įrašas sėkmingai sukurtas')
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

router.put('/edit/:id', auth, upload.single('image'), postValidator, async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        post.update(req.body)
        res.send('Įrašas sėkmingai atnaujintas')
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const post = await db.Posts.findByPk(req.params.id)
        post.destroy()
        res.json({ message: 'Įrašas sėkmingai ištrintas' })
    } catch {
        res.status(500).send('Įvyko serverio klaida')
    }
})

//CRUD - Create, Read, Update, Delete
//       POST    GET    PUT    DELETE

export default router