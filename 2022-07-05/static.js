class StatineKlase {
    static width = 500
    static height = 500

    constructor() {
        this.objWidth = StatineKlase.width
        this.objHeight = StatineKlase.height
    }

    static setWidth() {
        StatineKlase.width = 420
    }
}

console.log(StatineKlase.width)

const statineKlase = new StatineKlase()

StatineKlase.setWidth()
console.log(StatineKlase.width)

