import express from 'express'
import { engine } from 'express-handlebars'
import Students from './model/students.js'
import mongoose from 'mongoose'

const app = express()
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

await mongoose.connect('mongodb://localhost:27017/university')

app.get('/', async (req, res) => {
    const students = await Students.find().lean()
    res.render('students', { students })
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/submit', (req, res) => {
    try{
        const student = new Students(req.body)
        student.save()
        res.redirect('/')
    } catch(error) {
        res.redirect('/register')
    }
})

app.get('/delete/:id', async (req, res) => {
    const { id } = req.params
    await Students.findByIdAndDelete(id)
    res.redirect('/')
})

app.get('/edit/:id', async (req, res) => {
    const { id } = req.params
    const student = await Students.findById(id)
    res.render('edit', student)
})

app.post('/edit/:id', async (req, res) => {
    const { id } = req.params
    await Students.findByIdAndUpdate(id, req.body)
    res.redirect('/')
})

app.listen(3000)