import chalk from 'chalk'
// import { multiply } from './imports/functions.js'
// import functionsAll from './imports/functionsAll.js'
// import {multiply, x, y} from './imports/functionsIndividual.js'
import {multiply as funkcija, x, y} from './imports/functionsIndividual.js'

// console.log(
//     chalk
//     .red('Suskaičiuota reikšmė ' + 
//     functionsAll.multiply(functionsAll.x, functionsAll.y
// )))

console.log(
    chalk
    .red('Suskaičiuota reikšmė ' + 
    funkcija(x, y)
))


console.log(chalk.blue('Hello world!'))
console.log(chalk.yellow('Hello world!'))
console.log(chalk.yellow.bgBlue('Hello world!'))

