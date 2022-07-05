// Aprašykite klasę “Televizorius” su nurodytomis savybėmis: Gamintojas, kanalas ir garsas. 
// Gamintojo pavadinimą priskirkite konstruktoriuje kaip gautą parametrą. Vos tik įjungus televizorių turėtų būti 
// parinktas pirmas kanalas, o garso lygis 50. Sukurkite metodus kurie padidintų ir sumažintų televizoriaus garsą, 
// tačiau šis niekuomet negali būti žemiau nei 0 ir aukščiau nei 100. 
// Sukurkite metodą kuris keistų kanalą, tačiau atkreipkite dėmesį, kad gal televizorius jų turi tik 50, 
// tad jei pultelyje įvesite didesnį skaičių, kanalas turi būti pakeičiamas į pirmajį.
// Sukurkite metodą, kuris atstatytų televizorių atgal į gamyklinius parametrus.
// Sukurkite metodą, kuris grąžintų atgal eilutę “Televizorius ‘Sony’ šiuo metu rodo 8 kanalą. Garso lygis 76.”
function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

class Televizorius {
    constructor(gamintojas) {
        this.brand = gamintojas
        this.originalChannel = 1
        this.channel = this.originalChannel
        this.originalVolume = 50
        this.volume = this.originalVolume
    }

    setChannel(channel) {
        this.channel = (channel > 0 && channel <= 50) ? channel : 1

        return this
    }

    setVolume(volume) {
        this.volume = (volume >= 0 && volume <= 100) ? volume : this.volume

        return this
    }

    factoryReset() {
        this.volume = this.originalVolume
        this.channel = this.originalChannel

        return this
    }

    currentState() {
        return `Televizorius "${this.brand}" šiuo metu rodo ${this.channel} kanalą. Garso lygis ${this.volume}.`
    }
}

const televizorius = new Televizorius('Sony')

console.log(televizorius)

console.log(televizorius.setChannel(20).channel)
console.log(televizorius.setVolume(66).volume)

console.log(televizorius.factoryReset())
console.log(televizorius.currentState())
console.log(televizorius.setChannel(62).setVolume(-5).currentState())

const brands = ['Sony', 'Samsung', 'Šilelis', 'Tauras', 'LG']

brands.forEach(value => {
    const telikas = new Televizorius(value)

    telikas.setChannel(rand(-5, 55))
    telikas.setVolume(rand(-5, 105))

    console.log(telikas.currentState())
})