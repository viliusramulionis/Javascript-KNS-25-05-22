//Pirmas budas 
// fetch('https://aws.random.cat/meow?ref=apilist.fun')
// .then(resp => resp.json())
// .then(resp => {
//     document.querySelector('.image').innerHTML = `<img src="${resp.file}" alt="" />`
// })

//Antras budas naudojant asinchronine funkcija
const getImage = async () => {
    let image = await fetch('https://aws.random.cat/meow?ref=apilist.fun')
    image = await image.json()
    document.querySelector('.image').innerHTML = `<img src="${image.file}" alt="" />`
}

getImage()

// let x = 10

// const promiseFunction = () => {
//     return new Promise((resolve, rejected) => {
//         setTimeout(() => {
//             if(x === 10) { 
//                 rejected('Atitiko kondiciją')
//                 return
//             }
//             resolve(x)
//         }, 2000)
//     })
// }

// const waitingFunction = async () => { 
//     x = await promiseFunction()

//     console.log(x)
// }

// //waitingFunction()

// promiseFunction()
// .then(resp => console.log(resp))
// .catch((err) => {
//     console.log(err)
// })


// waitingFunction() //Grąžinamas promiso objektas
// .then(resp => {
//     console.log(resp)
// })

// waitingFunction()
// .then(resp => {
//     return resp + 1
// })
// .then(resp => {
//     return resp + 1
// })
// .then(resp => {
//     return resp + 1
// })
// .then(resp => {
//     return resp + 1
// })
// .then(resp => {
//     return resp + 1
// })
// .then(resp => {
//     console.log(resp)
// })
