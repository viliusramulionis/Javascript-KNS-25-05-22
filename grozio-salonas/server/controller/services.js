import express from 'express'
import db from '../database/connect.js'
import { servicesValidator } from '../middleware/validate.js'

const Router = express.Router()

Router.get('/', async (req, res) => {
    try {
        const services = await db.Services.findAll({
            include: { 
                model: db.Saloons, 
                attributes: ['name']
            }
        })
        res.json(services)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.post('/new', servicesValidator, async (req, res) => {
    try {
        await db.Services.create(req.body)
        res.send('Paslauga sėkmingai pridėta')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.put('/edit/:id', servicesValidator, async (req, res) => {
    try {
        const service = await db.Services.findByPk(req.params.id)
        await service.update(req.body)
        res.send('Paslauga sėkmingai atnaujinta')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
        const service = await db.Services.findByPk(req.params.id)
        await service.destroy()
        res.send('Paslauga sėkmingai ištrinta')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router