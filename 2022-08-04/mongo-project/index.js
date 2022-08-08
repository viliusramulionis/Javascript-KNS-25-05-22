import mongoose from 'mongoose'
import orders from './model/orders.js'

const connect = await mongoose.connect('mongodb://localhost:27017/test')

console.log(await orders.find())

const neworder = new orders()
neworder.name = 'Programiskai pridetas vartotojas'
neworder.email = 'organic@bit.lt'
neworder.password = '1234'

await neworder.save()