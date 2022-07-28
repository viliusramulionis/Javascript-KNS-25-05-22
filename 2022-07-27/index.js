import express from 'express'
import path from 'path'
import fs from 'fs/promises'

const app = express()

const file = './users.json'

app.get('/', async (req, res) => {
    if(JSON.stringify(req.query) != '{}') {

        if(req.query.email === '' || req.query.password === '') {
            res.send('Neužpildyti duomenys')
            return
        }

        if(!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(req.query.email)) {
            res.send('Neteisingas el. pašto adreso formatas')
            return
        }

        try {
            const data = await fs.readFile(file, 'utf8')
            const json = JSON.parse(data)
            if(!json.find(value => value.email === req.query.email && value.password === req.query.password)) {
                res.send('Neteisingi prisijungimo duomenys')
                return
            }
        } catch {
            res.send('Duomenu bazes failas nerastas')
            return
        }

        res.sendFile(path.resolve('./templates/admin.html'))
        return
    }

    res.sendFile(path.resolve('./templates/index.html'))
})

app.get('/register', async (req, res) => {
    if(JSON.stringify(req.query) != '{}') {

        if(req.query.name === '' || req.query.email === '' || req.query.password === '') {
            res.send('Neužpildyti duomenys')
            return
        }

        if(!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(req.query.email)) {
            res.send('Neteisingas el. pašto adreso formatas')
            return
        }

        try {
            const data = await fs.readFile(file, 'utf8')
            let json = JSON.parse(data)
            if(!json.find(value => value.email === req.query.email)) {
                json.push(req.query)
                await fs.writeFile(file, JSON.stringify(json, null, 4))
            } else {
                res.send('Toks vartotojas jau egzistuoja')
                return
            }
        } catch {
            await fs.writeFile(file, JSON.stringify([req.query], null, 4))
        }

        res.redirect('/')
        return
    }

    res.sendFile(path.resolve('./templates/register.html'))
})

app.listen(3000)