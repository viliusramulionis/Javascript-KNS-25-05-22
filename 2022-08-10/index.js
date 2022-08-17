import express from 'express'
import { engine } from 'express-handlebars'
import mysql from 'mysql2/promise'

const app = express()
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const database = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spotify'
})

app.get('/', async (req, res) => {
    const songs = await database.query('SELECT id, song_Name, song_Album FROM songs')

    res.render('index', { songs: songs[0] })
})

app.listen(3000)