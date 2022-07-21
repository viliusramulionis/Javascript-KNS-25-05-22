// Sukurkite NodeJs programą kuri pasinaudojusi standartiniu moduliu "readline" priimtų šias reikšmes:
// Vardas, Pavardė, Slaptažodis, El. pašto adresas, Gimtadienis.
// Reikšmes perduokite iš terminalo.
// Gautas reikšmes patikrinkite, ar tai nėra tušti stringai ir ar el. pašto adresas yra reikiamo formato.
// Aprašykite programą taip, kad gauta informacija būtų talpinama ir papildoma json faile pavadinimu "registrations.json".
// Klaidos atveju grąžinkite atitinkamas žinutes nuspalvintas raudona spalva. 
// Sėkmingu atveju grąžinkite žinutę nuspalvintą žalia spalva ir tekstu "Registracija sėkminga"
import chalk from 'chalk'
import readline from 'readline'
import fs from 'fs/promises'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const file = './registrations.json'

const handleValidation = (value, type = 'text') => {
    if(value === '' || value === ' ') {
        console.log(chalk.red('Neįvesta jokia reikšmė'))
        rl.close()
        return false
    }

    if(type === 'email' && !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        console.log(chalk.red('Įvesta reikšmė nėra el. pašto adresas'))
        rl.close()
        return false
    }

    return true
}

rl.question('Įveskite vardą: ', (vardas) => {
    if(!handleValidation(vardas))
        return false

    rl.question('Įveskite pavardę: ', (pavarde) => {
        if(!handleValidation(pavarde))
            return false

        rl.question('Įveskite slaptažodį: ', (slaptazodis) => {
            if(!handleValidation(slaptazodis))
                return false

            rl.question('Įveskite el. pašto adredsą: ', (elpastas) => {
                if(!handleValidation(elpastas, 'email'))
                    return false

                rl.question('Įveskite gimimo dieną: ', async (gimtadienis) => {
                    if(!handleValidation(gimtadienis))
                        return false

                    const result = {vardas, pavarde, slaptazodis, elpastas, gimtadienis}

                    try {
                        let data = await fs.readFile(file, 'utf8')
                        data = JSON.parse(data)
                        data.push(result)
                        data = JSON.stringify(data, null, 4)
                        await fs.writeFile(file, data)
                    } catch {
                        await fs.writeFile(file, JSON.stringify([result], null, 4))
                    }

                    console.log(chalk.green('Duomenys sėkmingai issaugoti'))

                    rl.close()
                })
            })
        })
    })
})

//const questions = ['Įveskite vardą:', 'Įveskite pavardę:', 'Įveskite slaptažodį:', 'Įveskite el. pašto adresą:', 'Įveskite gimimo dieną:']

