import express from 'express'
import cors from 'cors'
import posts from './controller/posts.js' 

const app = express()

//Duomenų priėmimui POST metodu
app.use(express.urlencoded({ extended: true }))

//CORS blokavimo nuėmimas 
app.use(cors())

//Priskiriame posts kontrolerį
app.use(posts)

//Paleidžiame serverį
app.listen(3000)