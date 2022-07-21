import express from 'express'
import path from 'path'

const app = express()

app.get('/', function (req, res) {
    //?parametras=vienas - query pavyzdys
    //req - uzklausos informacija
    //res - atsakymo informacija

    //req.query - grazina atgal is uzklausos adreso perduodamus parametrus
    //console.log(req.query.parametras)
    if(req.query.parametras === 'vienas')
        res.sendFile(path.resolve('./templates/index.html')) //sendFile metodas grazina i narsykle norimo failo turini
    else 
        res.send('<h1>Blogas parametras</h1>')
})

app.listen(3000)