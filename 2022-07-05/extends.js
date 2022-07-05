class Pirma {
    #width

    constructor() {
        this.#width = 500
        this.height = 250
        this.#setWidth(1500)
    }

    #setWidth(width) {
        this.#width = width
    } 

    setHeight(height) {
        this.height = height
    }
}

const pirma = new Pirma()

//pirma.setWidth(750)
console.log(pirma)

class Antra extends Pirma {
    constructor() {
        super()
    }

    getWidth() {
        return this.width
    }
}

const antra = new Antra()
//antra.setWidth(1500)
//console.log(antra.width)