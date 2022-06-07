function validateProfile(data) {
    //Object.keys(data)
    //Objekto konvertavimas į masyvą su indeksų reikšmėmis
    
    // for(const index of Object.keys(data)) {
    //     if(data[index] === '')
    //         return false
    // }

    for(const value of Object.values(data)) {
        if(value === '')
            return false
    }
    return true
}

function artistProfile(data) {
    if( !validateProfile(data) ) 
        return false
             
    return `<div class="col">
                <div class="card shadow-sm">
                    <img src="${data.image}" class="bd-placeholder-img card-img-top" width="100%" height="225" />

                    <div class="card-body">
                    <p class="card-text">
                        <h2>${data.name}</h2>
                        <div>${data.bio}</div>
                        <div>${data.country}</div>
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">${data.year}</small>
                    </div>
                    </div>
                </div>
            </div>`  
}

fetch('https://www.theaudiodb.com/api/v1/json/2/search.php?s')
.then(resp => resp.json())
.then(resp => {
    let html = `<div class="album py-5 bg-light">
                    <div class="container">
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">`

    resp.artists.map(value =>  {
        const profile = {
            name: value.strArtist,
            year: value.intFormedYear,
            image: value.strArtistThumb,
            bio: value.strBiographyEN,
            country: value.strCountry
        }
        
        html += artistProfile(profile)
    })

    html += `</div></div></div>`
    
    document.querySelector('#app').innerHTML = html
})