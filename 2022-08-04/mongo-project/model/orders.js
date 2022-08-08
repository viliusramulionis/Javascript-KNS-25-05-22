import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Orders = new Schema({
    name: String,
    email: String,
    password: String
})

export default mongoose.model('Orders', Orders)