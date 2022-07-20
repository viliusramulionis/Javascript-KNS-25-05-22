import fs from 'fs/promises'
import { faker } from '@faker-js/faker'

const file = './people.csv'

for(let i = 0; i < 50; i++) {
    const person = `${faker.name.firstName()},${faker.name.lastName()},${faker.internet.password()},${faker.internet.email()},${faker.date.birthdate()}\n`

    try {
        const data = await fs.readFile(file, 'utf8')
        await fs.writeFile(file, data + person, 'utf8')
        console.log('Failas sėkmingas papildytas')
    } catch {
        await fs.writeFile(file, person, 'utf8')
        console.log('Failas nerastas, bet sukurtas')
    }
}
