// Grupės pavadinimu,
// Susikūrimo data,
// Žanru,
// Šalimi,
// Biografija,
// Grupės nuotrauka
fetch('https://www.theaudiodb.com/api/v1/json/2/search.php?s=coldplay')
.then(resp => resp.json())
.then(resp => {
    const profile = resp.artists[0]
    let html = `<div class="profile">
                    <div class="image">
                        <img src="${profile.strArtistBanner}" alt="" />
                    </div>  
                    <h2>${profile.strArtist}</h2>
                    <div class="year">${profile.intFormedYear}</div>  
                    <div class="genre">${profile.strGenre}</div>  
                    <div class="country">${profile.strCountry}</div>  
                    <div class="bio">${profile.strBiographyEN}</div>  
                </div>`

    document.querySelector('#app').innerHTML = html
})