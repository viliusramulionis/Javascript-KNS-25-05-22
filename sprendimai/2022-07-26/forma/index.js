import express from 'express'
import path from 'path'
import fs from 'fs/promises'
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
app.get('/', async (req, res) => {
    if(JSON.stringify(req.query) !== '{}') {
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
            //Failo papildymas
            let data = await fs.readFile(file, 'utf8')
            data = JSON.parse(data)
            data.push(req.query)
            data = JSON.stringify(data, null, 4)
            await fs.writeFile(file, data)
        } catch {
            //Failo sukurimas
            await fs.writeFile(file, JSON.stringify([req.query], null, 4))
        }
    
        res.send('<h1 style="text-align: center; color: green;">Duomenys sėkmingai išsaugoti</h1>')

        return
    }
    res.sendFile( path.resolve('./templates/index.html') )
})

app.listen(3000)