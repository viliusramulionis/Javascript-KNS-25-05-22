const messages = document.getElementById('messages')
const response = document.getElementById('response')

async function randomNuotrauka() {
    try {
        //Bandome paimti atsitiktinio šuniuko nuotrauką
        const resp = await fetch('https://dog.ceo/api/breeds/image/random')
        //Po palaukimo konvertuojame gautą atsakymą iš json stringo i javascript objektą 
        const json = await resp.json()
        //Įkeliame nuotraukos adresą i <img> elementą ir priskiriame DOM'e
        response.innerHTML = `<img src="${json.message}" alt="" />`
    } catch {
        //Nepavykos atlikti bent vieno is auksciau isvardintų veiksmų
        //grąžiname žinutę
        messages.textContent = 'Įvyko klaida'
        messages.style.display = 'block'
    }
}

async function fetchBreed(event) {
    event.preventDefault()
    const button = event.target
    const breed = button.parentNode.querySelector('input[name="veisle"]').value
    
    if(breed === '') {
        messages.textContent = 'Įveskite veislę'
        messages.style.display = 'block'
        return false
    }

    try {
        const resp = await fetch(`https://dog.ceo/api/breed/${breed.toLowerCase()}/images/random`)
        const json = await resp.json()

        if(json.status === 'success') {
            response.innerHTML = `<img src="${json.message}" alt="" />`
            messages.style.display = 'none'
        } else {
            messages.textContent = 'Nepavyko rasti tokios veislės'
            messages.style.display = 'block'
        }

    } catch {
        messages.textContent = 'Įvyko klaida'
        messages.style.display = 'block'
    }
}

window.addEventListener('load', function () {
    randomNuotrauka()
})
    
// fetch('https://dog.ceo/api/breeds/image/random')
// .then(resp => resp.json())
    // .catch(resp => {

    // })

// fetch('https://dog.ceo/api/breeds/image/random')
// .then(resp => {

//     fetch('https://dog.ceo/api/breeds/image/random')
//     .then(resp => {

//         fetch('https://dog.ceo/api/breeds/image/random')
//         .then(resp => {
//             console.log(resp)
//         })

//     })

// })