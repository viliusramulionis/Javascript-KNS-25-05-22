fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
.then(resp => resp.json())
.then(resp => {
    const object = resp.drinks[0]
    let ingredients = ''

    for(let i = 1; i <= 15; i++ ) {
        if(object['strIngredient' + i])
            ingredients += `<li>${object['strIngredient' + i]}</li>`
    }

    let html = `<h1>${resp.drinks[0].strDrink}</h1>
    <img src="${resp.drinks[0].strDrinkThumb}" alt="" />
    <ul>
        ${ingredients}
    </ul>
    <p>${resp.drinks[0].strInstructions}</p>`

    document.querySelector('.cocktail').innerHTML = html
})

