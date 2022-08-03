import express from 'express'
import { engine } from 'express-handlebars'

const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/api/weather', (req, res) => {
    const data = {
        condition: 'windy',
        degrees: 20,
        location: 'Barcelona, Spain',
        windSpeed: 4,
        humidity: 64
    }
    res.json(data)

    // res.send()
    // res.sendFile()
    // res.render()
    // res.redirect()
    // res.json()
})

app.listen(3000)