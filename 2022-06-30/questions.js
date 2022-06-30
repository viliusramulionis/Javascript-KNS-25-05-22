import readline from 'readline'
import { authenticate } from './login/login.js'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Įveskite prisijungimo vardą:', (login) => {
    rl.question('Įveskite slaptažodį:', (password) => {
        if(authenticate(login, +password)) {
            console.log('Prisijungimas sėkmingas')
        } else {
            console.log('Neteisingi prisijungimo duomenys')
        }
        rl.close()
    })
})