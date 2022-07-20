//JSON.strigify() užšifruoja kodą į stringą
//JSON.parse() iššifruoja stringą į kodą
import fs from 'fs/promises'
import { faker } from '@faker-js/faker'

const file = './people.json'

const person = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    birthday: faker.date.birthdate()
}

//appendFile dirbant su JSON formatu mums NETINKA!
// try {
//     await fs.appendFile(file, JSON.stringify(person))
//     console.log('Failas sekmingai issaugotas')
// } catch {
//     console.log('Nepavyko issaugoti failo')
// }

try {
    const data = await fs.readFile(file, 'utf8')
    const json = JSON.parse(data)
    json.push(person)
    await fs.writeFile(file, JSON.stringify(json))
} catch {
    const data = [person]
    await fs.writeFile(file, JSON.stringify(data))
}


