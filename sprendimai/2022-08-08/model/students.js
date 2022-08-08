import mongoose from 'mongoose'

const Schema = mongoose.Schema

const studentsSchema = new Schema({
    name: String,
    surname: String,
    address: String,
    phone: String,
    email: String,
    personalId: String
})

const Students = mongoose.model('Students', studentsSchema)

export default Students