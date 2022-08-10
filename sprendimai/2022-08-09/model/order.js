import mongoose from 'mongoose'

const Schema = mongoose.Schema({
    checked: String,
    name: String,
    lastName: String,
    email: String,
    address: String,
    city: String,
    phone: String,
    createAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', Schema)

export default Order