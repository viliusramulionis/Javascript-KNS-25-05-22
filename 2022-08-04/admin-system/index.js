import express from 'express'
import session from 'express-session'
import { engine } from 'express-handlebars'
import fs from 'fs/promises'
import auth from './middleware/auth.js'

const app = express()
const file = './database.json'

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

//Konfigūracijos eilutė sesijos priskyrimui prie aplikacijos
app.use(session({
    secret: 'labai slapta fraze',
    resave: true,
    saveUninitialized: false,
    cookie: { 
        maxAge: 6000000
    }
}))

//Nurodoma statiniu failu perdavimo kelias ir direktorija i kuria kreipiamasi
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
            
        req.session.loggedIn = true
        return res.redirect('/admin')
    } catch {
        return res.render('login', { message: 'Duomenu bazės failas nerastas', status: 'danger' })
    }
})

//Formos atvaizdavimas
app.get('/register', async (req, res) => {
    res.render('register')
})

//Duomenu priemimas is formos
app.post('/register', async (req, res) => {
    if(
        JSON.stringify(req.body) != '{}' &&
        req.body.name !== '' &&
        req.body.email !== '' &&
        req.body.password !== ''
    ) {
        try {
            let data = await fs.readFile(file, 'utf8')
            data = JSON.parse(data)
            if(data.find(user => user.email === req.body.email))
                return res.render('register', { message: 'Toks vartotojas jau yra registruotas', status: 'danger' })

            data.push(req.body)
            await fs.writeFile( file, JSON.stringify(data, null, 4))
        } catch {
            await fs.writeFile( file, JSON.stringify([req.body], null, 4) )
        }
        
        //return res.render('register', {message: 'Vartotojas sėkmingai užregistruotas <a href="/">prisijunkite</a>', status: 'success'})
        return res.redirect('/?status=1')
    }
})

app.get('/admin', auth, async (req, res) => {
    const data = await fs.readFile(file, 'utf8')
    const users = JSON.parse(data)
    const options = { users }

    options.message = req.query.message
    options.status = req.query.status

    res.render('admin', options)
})

app.get('/delete/:id', auth,  async (req, res) => {
    try {
        const data = await fs.readFile(file, 'utf8')
        let users = JSON.parse(data)
        users = users.filter((user, index) => index != req.params.id)
        await fs.writeFile(file, JSON.stringify(users, null, 4))
        res.redirect('/admin?message=Vartotojas sėkmingai ištrintas&status=success')
    } catch {
        res.redirect('/admin?message=Įvyko klaida&status=danger')
    }
})

app.get('/edit/:id', auth, async (req, res) => {
    const id = req.params.id
    try {
        const data = await fs.readFile(file, 'utf8')
        const user = JSON.parse(data).find((value, index) => index == id)
        res.render('edit', user)
    } catch {
        res.render('edit', { message: 'Nepavyko perskaityti failo', status: 'danger'})
    }
})

app.post('/edit/:id', auth, async (req, res) => {
    const id = req.params.id

    if(
        JSON.stringify(req.body) != '{}' &&
        req.body.name !== '' &&
        req.body.email !== '' &&
        req.body.password !== ''
    ) {
        try {
            let data = await fs.readFile(file, 'utf8')
            data = JSON.parse(data)
            data[id] = req.body
            await fs.writeFile( file, JSON.stringify(data, null, 4))
            res.redirect('/admin?message=Duomenys sėkmingai pakeisti&status=success')
        } catch {
            res.redirect('/admin?message=Įvyko klaida&status=danger')
        }
    }
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