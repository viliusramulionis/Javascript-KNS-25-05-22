const loop = (callback) => {
    callback()
    loop(callback)
}

loop(() => {
    console.log('Veikia')
})
