import express from 'express'
import { engine } from 'express-handlebars'
import fs from 'fs/promises'

const app = express()
const file = './database.json'

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use('/public', express.static('public'))
//Norint priimti duomenis POST ir PUT metodais reikalinga ši eilutė
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    const options = {}

    if(req.query.status === '1') {
        options.message = 'Vartotojas sėkmingai sukurtas'
        options.status = 'success'
    }

    res.render('login', options)
})

app.post('/', async (req, res) => {
    if(req.body.email === '' || req.body.password === '')
        return res.render('login', { message: 'Neįvesti prisijungimo duomenys', status: 'danger' })

    try {
        const data = await fs.readFile(file, 'utf8')
        if(!JSON.parse(data).find(user => user.email === req.body.email && user.password === req.body.password)) 
            return res.render('login', { message: 'Neteisingi prisijungimo duomenys', status: 'danger' })
            
        
        return res.redirect('/admin')
    } catch {
        return res.render('login', { message: 'Duomenu bazės failas nerastas', status: 'danger' })
    }
})

app.get('/register', async (req, res) => {
    if(
        JSON.stringify(req.query) != '{}' &&
        req.query.name !== '' &&
        req.query.email !== '' &&
        req.query.password !== ''
    ) {
        try {
            let data = await fs.readFile(file, 'utf8')
            data = JSON.parse(data)
            if(data.find(user => user.email === req.query.email))
                return res.render('register', { message: 'Toks vartotojas jau yra registruotas', status: 'danger' })

            data.push(req.query)
            await fs.writeFile( file, JSON.stringify(data, null, 4))
        } catch {
            await fs.writeFile( file, JSON.stringify([req.query], null, 4) )
        }
        
        //return res.render('register', {message: 'Vartotojas sėkmingai užregistruotas <a href="/">prisijunkite</a>', status: 'success'})
        return res.redirect('/?status=1')
    }
    res.render('register')
})

app.listen(3000)

//CRUD
//CREATE - POST (Registracija)
//READ - GET (Admino sarasas)
//UPDATE - PUT (Redagavimas)
//DELETE - DELETE (Vartotojo istrynimas)

// app.get('/orders')
// app.post('/orders')
// app.put('/orders')
// app.delete('/orders')