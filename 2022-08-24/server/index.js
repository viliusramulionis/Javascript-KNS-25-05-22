import express from 'express'
import cors from 'cors'
import posts from './controller/posts.js' 
import users from './controller/users.js' 

const app = express()

//CORS blokavimo nuėmimas 
app.use(cors())

//Duomenų priėmimui JSON formatu
app.use(express.json())

//Duomenų priėmimui POST metodu
app.use(express.urlencoded({extended: true}))

//Priskiriame posts kontrolerį
app.use('/api/posts/', posts)

//Priskiriame users kontrolerį
app.use('/api/users/', users)

//Paleidžiame serverį
app.listen(3000)