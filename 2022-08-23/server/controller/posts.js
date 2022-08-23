import express from 'express'
import db from '../database/connect.js'

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

        res.status(500).json({message: 'Įvyko serverio klaida'})
    }
})

router.get('/:id', async (req, res) => {
    const post = await db.Posts.findByPk(req.params.id)
    res.json(post)
})

router.post('/', async (req, res) => {
    new db.Posts(req.body).save()
    res.json({ message: 'Įrašas sėkmingai sukurtas' })
})

router.put('/edit/:id', async (req, res) => {
    const post = await db.Posts.findByPk(req.params.id)
    post.update(req.body)
    res.json({ message: 'Įrašas sėkmingai atnaujintas'})
})

router.delete('/delete/:id', async (req, res) => {
    const post = await db.Posts.findByPk(req.params.id)
    post.destroy()
    res.json({ message: 'Įrašas sėkmingai ištrintas' })
})

//CRUD - Create, Read, Update, Delete
//       POST    GET    PUT    DELETE

export default router