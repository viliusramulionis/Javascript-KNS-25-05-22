function objektas() {
    this.x = 10
    this.y = 20
    this.setX = function() {
        this.x = 0
    }
}

const obj = new objektas()
console.log(obj)