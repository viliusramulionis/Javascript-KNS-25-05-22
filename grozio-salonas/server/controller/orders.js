import express from 'express'
import db from '../database/connect.js'
import { ordersValidator } from '../middleware/validate.js'

const Router = express.Router()

//Admino užsakymų sąrašas
Router.get('/', async (req, res) => {
    try {
        const orders = await db.Orders.findAll({
            include: [
                { 
                    model: db.Users,
                    attributes: ['first_name', 'last_name']
                },
                { 
                    model: db.Services,
                    attributes: ['name']
                }
            ]
        })
        res.json(orders)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

//Vartotojo užsakymai
Router.get('/user/', async (req, res) => {
    //Laikinas sprendimas
    const user_id = 1

    try {
        const orders = await db.Orders.findAll({
            where: { userId: user_id },
            include: [
                { 
                    model: db.Services, 
                    include: db.Saloons
                }, 
                db.Workers
            ]
        })
        res.json(orders)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

Router.get('/single/:id', async (req, res) => {
    try {
        const orders = await db.Orders.findByPk(req.params.id)
        res.json(orders)
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.post('/new', ordersValidator, async (req, res) => {
    try {
        await db.Orders.create(req.body)
        res.send('Užsakymas sėkmingai sukurtas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.put('/edit/:id', ordersValidator, async (req, res) => {
    try {
        const order = await db.Orders.findByPk(req.params.id)
        await order.update(req.body)
        res.send('Užsakymas sėkmingai atnaujintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida išssaugant duomenis')
    }
})

Router.delete('/delete/:id', async (req, res) => {
    try {
        const order = await db.Orders.findByPk(req.params.id)
        await order.destroy()
        res.send('Užsakymas sėkmingai ištrintas')
    } catch(error) {
        console.log(error)
        res.status(500).send('Įvyko klaida')
    }
})

export default Router