import express from 'express'
import fs from 'fs/promises'
import path from 'path'

const app = express()

const handleValidation = (value, type = 'text') => {
    if(value === '' || value === ' ') {
        return false
    }

    if(type === 'email' && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return false
    }

    return true
}

const file = './webregistrations.json'
const fields = ['vardas', 'pavarde', 'slaptazodis', 'elpastas', 'gimtadienis']

//Route'as (Kelias)
app.get('/', async function (req, res) {
    const query = Object.keys(req.query)

    if(fields.length !== query.length) {
        res.send('<h2 style="text-align: center; color: red;">Neperduotos reikšmės</h2>')
        return
    }

    for(const key of query) {
        if(!handleValidation(req.query[key], key === 'elpastas' ? 'email' : null) || 
            !fields.includes(key)) {
            res.send('Perduotos blogos reikšmės')
            return
        }
    }

    try {
        let data = await fs.readFile(file, 'utf8')
        data = JSON.parse(data)
        data.push(req.query)
        data = JSON.stringify(data, null, 4)
        await fs.writeFile(file, data)
    } catch {
        await fs.writeFile(file, JSON.stringify([req.query], null, 4))
    }

    res.send('<h1 style="text-align: center; color: green;">Duomenys sėkmingai išsaugoti</h1>')
})

app.get('/webmechanika', (req, res) => {
    if(req.query.color === 'black') {
        res.sendFile(path.resolve('./templates/black.html'))
    } else {
        res.sendFile(path.resolve('./templates/red.html'))
    }
})

app.get('/:x', (req, res) => {
    //req.query - Perduodama tai kas irasoma i query su ? & formatu
    //req.params - Norint paimti "betkas" parametro reiksme
    res.send('Kelias su kintamuoju x : ' + req.params.x)
})

app.get('/:x/:y', (req, res) => {
    //req.query - Perduodama tai kas irasoma i query su ? & formatu
    //req.params - Norint paimti "betkas" parametro reiksme
    res.send('Kelias su kintamuoju x : ' + req.params.x + ' y : ' + req.params.y)
})

app.listen(3000)