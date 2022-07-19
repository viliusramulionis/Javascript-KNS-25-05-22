//File System with Callbacks
// import fs from 'fs'

// fs.readFile('./hello.txt', 'utf8', (error, data) => {
//     if(error) {
//         console.log('Ivyko klaida bandant perskaityti faila')
//     } else {
//         console.log('Failo tekstas: ', data)
    
//         fs.writeFile('./hello.txt', data + 'Hello World!', 'utf8', (error) => {
//             if(error) {
//                 console.log('Ivyko klaida')
//             } else { 
//                 console.log('Failas sekmingai issaugotas')
//             }
//         })
//     }
// })

import fs from 'fs/promises'

try {
    const data = await fs.readFile('./hello.txt', 'utf8')
    console.log('Faile esanti informacija: ', data)

    await fs.writeFile('./hello.txt', data + 'Hello World!', 'utf8')
    console.log('Failas sėkmingai issaugotas')
} catch(err) {
    console.log('Ivyko klaida')
}
