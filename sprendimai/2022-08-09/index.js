import express from 'express'
import { engine } from 'express-handlebars'
import mongoose from 'mongoose'
import Order from './model/order.js'

await mongoose.connect('mongodb://localhost/admin')

const app = express()
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('order')
})

app.post('/', async (req, res) => {
    const order = new Order(req.body)
    await order.save()
    
    res.redirect('/')
})

app.get('/admin', async (req, res) => {
    const options = {}
    if(req.query.filter) {
        options.checked = req.query.filter
    }
    const orders = await Order.find(options).lean()
    const ordersWithDate = orders.map(order => {
        order.createAt = order.createAt.toLocaleDateString('lt-LT')
        return order
    })

    res.render('admin', { orders: ordersWithDate })
})

app.listen(3000)