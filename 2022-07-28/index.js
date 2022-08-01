import express from 'express'
import { engine } from 'express-handlebars'

const app = express()

//Handlebars šablonų valdiklio konfigūracija
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './templates')

//Konfigūracijos eilutė perduoti statiniams failams
//Pirmu argumentu nurodomas kelias kuriuo turėtų vykti kreipąsis
//Antru argumentu nurodoma direktorija iš kurios bus imami failai
app.use('/public', express.static('resources'))

//Titulinis puslapis
app.get('/', (req, res) => {
    //const vardas = req.query.vardas
    const masyvas = ['Gabrielė', 'Dainius', 'Adomas', 'Elena', 'Rytis']
    const objektas = {
        miestas: 'Kaunas',
        adresas: 'Vytauto pr. 29',
        telefonas: '+37065165165'
    }
    const html = `<table>
                    <tr>
                        <td>Kaunas</td>
                        <td>Vytauto pr. 29</td>
                        <td>+37065165165</td>
                    </tr>
                  </table>`

    res.render('home', { vardas, masyvas, objektas, html })
})

//Apie Mus
app.get('/about-us', (req, res) => {
    res.render('about-us')
})

//Istorija
app.get('/history', (req, res) => {
    res.render('history')
})

//Klientai
app.get('/clients', (req, res) => {
    res.render('clients')
})

//Kontaktai
app.get('/contacts', (req, res) => {
    res.render('contacts')
})


app.listen(3000)