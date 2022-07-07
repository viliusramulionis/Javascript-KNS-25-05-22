// Sukurkite klasę "ShoppingCart", kuri turėtų savybes cartItems, discountCodes, shippingCost, discount.
// Savybė shippingCost priimama iššaukiant klasę ir perduodant ją parametre, tačiau ši negali būti mažesnė nei 1.99.
// Savybei discountCodes aprašykite masyvą turintį bent tris reikšmes su galimais nuolaidos kodais.
// Klasėje sukurkite metodą addItem kuris priimtų parametrą su prekės pavadinimu ir patalpintų reikšmę į masyvą esantį cartItems reikšmėje.
// Sukurkite metodą getTotal kuris paskaičiuotų ir grąžintų bendrą sumą padauginus visas į krepšelį pridėtas prekes iš 9.98 (Kiekvienos prekės kaina), 
// pridėtų 21% PVM mokesčio nuo bendros sumos bei pripliusuotų siuntimo mokesčio sumą.
// Sukurkite metodą getVat kuris paskaičiuotų grąžintų koks būtų mokamas PVM mokestis.
// Sukurkite metodą addDiscount kuris parametre priimtų nuolaidos kodą ir tikrintų ar toks yra įrašytas nuolaidos kodų masyve. 
// Teikiamu atveju pakeiskite savybės discount reikšmę į true ir priskirkite 15% nuolaidą visoms prekėms. 
// NUOLAIDA SIUNTIMO IŠLAIDOMS NETAIKOMA. 
// Modifikuokite metodus getTotal bei getVat, jog šie grąžintų atitinkamas sumas jeigu nuolaida buvo pritaikyta.

class ShoppingCart {
    constructor(shippingCost) {
        this.cartItems = []
        this.discountCodes = ['Labas', 'PIGU15', 'SENUKAI']
        this.shippingCost = shippingCost >= 1.99 ? shippingCost : 1.99 
        this.discount = false
    }

    addItem(product) {
        this.cartItems[this.cartItems.length] = product

        return this
    }

    getTotal() {
        const total = this.cartItems.length * 9.98
        let totalWithVat = total + ((total / 100) * 21)

        if(this.discount)
            totalWithVat = totalWithVat - ((totalWithVat * 15) / 100)

        return (totalWithVat + this.shippingCost).toFixed(2)
    }

    getVat() {
        let total = this.cartItems.length * 9.98
        
        if(this.discount)
            total = total - ((total * 15) / 100)

        return (total / 100 * 21).toFixed(2)
    }

    addDiscount(discountCode) {
        this.discount = this.discountCodes.includes(discountCode)

        return this.getTotal()
    }
}

const shoppingCart = new ShoppingCart(3.45)

shoppingCart.addItem('Lovos užtiesalas "Deluxe"')
shoppingCart.addItem('Lova "SuperMiegas"')
shoppingCart.addItem('Kėdė "Patogi"')

console.log(shoppingCart.getTotal())
console.log(shoppingCart.getVat())
console.log(shoppingCart.addDiscount('PIGU15'))
// console.log(shoppingCart.getTotal())
// console.log(shoppingCart.getVat())