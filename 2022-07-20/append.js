import fs from 'fs/promises'
import { faker } from '@faker-js/faker'

const file = './people.txt'

const person = `${faker.name.firstName()},${faker.name.lastName()},${faker.internet.password()},${faker.internet.email()},${faker.date.birthdate()}\n`

try {
    await fs.appendFile(file, person)
    console.log('Failas sėkmingai išsaugotas')
} catch {
    console.log('Nepavyko išsaugoti failo')
}