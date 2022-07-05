//const date = new Date() //Dabartinio laiko Timestamp'as
const date = new Date('2022-07-01') //Timestamp

//console.log(date.toLocaleDateString('nl-NL'))

// console.log(date.getDate())
// console.log(date.getMonth())
// console.log(date.getFullYear())

// console.log(date.getHours())
// console.log(date.getMinutes())
// console.log(date.getSeconds())

const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

console.log(`Data: ${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)

console.log(`Data: ${date.toLocaleDateString('lt-LT')} ${date.toLocaleTimeString()}`)