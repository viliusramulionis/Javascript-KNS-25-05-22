import express from 'express'
import path from 'path'

const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./templates/index.html'))
})

app.get('/apie-kompanija', (req, res) => {
    res.sendFile(path.resolve('./templates/company.html'))
})

app.get('/darbo-galimybes', (req, res) => {
    res.sendFile(path.resolve('./templates/work_opportunities.html'))
})

app.get('/klientai', (req, res) => {
    res.sendFile(path.resolve('./templates/clients.html'))
})

app.get('/kontaktai', (req, res) => {
    res.sendFile(path.resolve('./templates/contacts.html'))
})


app.listen(3000)