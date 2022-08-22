import express from 'express'
import cors from 'cors'
import session from 'express-session'
import posts from './controller/posts.js' 

const app = express()

//Duomenų priėmimui POST metodu
app.use(express.urlencoded({ extended: true }))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}))
//CORS blokavimo nuėmimas 
app.use(cors())

//Priskiriame posts kontrolerį
app.use('/api/posts', posts)

//Paleidžiame serverį
app.listen(3000)