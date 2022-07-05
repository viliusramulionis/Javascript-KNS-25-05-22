class Sablonas {
    constructor(skaicius, metai, vardas, nariai) {
        this.skaicius = skaicius
        this.metai = metai
        this.vardas = vardas
        this.nariai = nariai
        this.naujasSkaicius = this.metai + this.skaicius
    }

    //Metodo aprašymas
    //Setterio pavyzdys
    setNaujasSkaicius(skaicius) {
        this.naujasSkaicius = skaicius

        return this
    }

    //Getterio pavyzdys
    getNaujasSkaicius() {
        return this.naujasSkaicius + 10
    }
} 

//Objektiniame programavime objektas vadinasi instancija (Instance)
//Instancijos issaukimas:
const sablonas = new Sablonas(50, 2022, 'Sandra', [])
const sablonas2 = new Sablonas(10, 1990, 'Liutkus', [])

console.log(sablonas2)

//Objekto kūrimo pavyzdys

// const objektas = {
//     skaicius: 20,
//     metai: 2022,
//     vardas: 'Vilius',
//     nariai: ['Eglė', 'Sandra', 'Paulius', 'Albertas', 'Kūlokas'],
//     naujasSkaicius: 0,
//     setNaujasSkaicius: function() {
//         this.naujasSkaicius = this.skaicius + this.metai

//         return this
//     },
//     setNariai: function(narys) {
//         this.nariai.push(narys)

//         return this
//     }
// }

// //Objekte funkcija vadinasi metodas (method)
// //Objekte esantys indeksai vadinasi savybemis (properties)

// // const funkcija = () => {
// //     //this negali buti pasiekiamas naudojant arrow funkciją
// // }

// // objektas.setNaujasSkaicius().setNariai('Binas')

// // console.log(objektas)

// console.log(objektas.setNaujasSkaicius().setNariai('Binas').naujasSkaicius)

// objektas.naujasSkaicius = 658

// console.log(objektas.naujasSkaicius)

