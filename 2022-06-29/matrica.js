import chalk from 'chalk'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'

//CommonJs importo variantas
// const yargs = require('yargs/yargs')
// const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv)).argv

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); 
}

//process.stdout.columns - Terminalo pločio grąžinimas
//process.stdout.rows - Terminalo aukščio grąžinimas

if(argv.launch === 'matrica') {
    const symbols = 'abcdefghijklmnopqrstuvwxyz123456789!@#$%^&*(()'
    
    let string = ''
    for(let i = 0; i < process.stdout.columns; i++) {
        const random = getRandomIntInclusive(0, symbols.length - 1)
        string += symbols[random]
    }

    console.log(chalk.green(string))
}
