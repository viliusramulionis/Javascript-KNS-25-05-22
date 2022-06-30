import chalk from 'chalk'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { authenticate } from './login/login.js'

const argv = yargs(hideBin(process.argv)).argv

if(!argv.login || !argv.password) {
    console.log(chalk.bgRed.white('Negauti prisijungimo duomenys'))
} else {
    if(authenticate(argv.login, argv.password)) {
        console.log(chalk.bgGreen.white('Prisijungimas sėkmingas'))
    } else {
        console.log(chalk.bgRed.white('Neteisingi prisijungimo duomenys'))
    }
}