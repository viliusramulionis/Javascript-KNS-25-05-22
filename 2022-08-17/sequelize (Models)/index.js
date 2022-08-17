import express from 'express'
import database from './database/connect.js'

const app = express()

app.get('/', (req, res) => {
    res.send('Test')
})

app.listen(3000)