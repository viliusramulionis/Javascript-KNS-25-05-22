function movie(data) {
    let html = `<div class="movie"> 
                    <img src="${data.Poster}" alt="${data.Title}" />
                    <h4>${data.Title}</h4>
                    <div class="type">${data.Type}</div>
                    <div class="year">${data.Year}</div>
                </div>`

    return html
}

function pagination(total, current = 1, perpage = 10) {
    const totalpages = Math.ceil(total / perpage)
    let html = ''
    for(let i = 1; i <= totalpages; i++) {
        const active = current === i ? 'active' : ''
        //const active = current === i

        // let active = false

        // if(current === i)
        //     active = true

        html += `<li class="page-item ${active}">
                    <a class="page-link" onclick="getMovies(${i})">${i}</a>
                 </li>`
    }

    return html
}

async function getMovies(page = 1) {
    //url query
    //?param=reiksme&param=reiksme&param=reiksme&param=reiksme&param=reiksme&
    const resp = await fetch('http://www.omdbapi.com/?apikey=2e9b1f46&s=Batman&page=' + page)
    const json = await resp.json()
    let html = ''

    if(json.totalResults === 0) 
        return false

    json.Search.map(function(film) {
        html += movie(film)
    })

    document
    .getElementById('app')
    .innerHTML = `<div class="moviesGrid">${html}</div>`

    document
    .querySelector('.pagination')
    .innerHTML = pagination(json.totalResults, page)

    console.log(json)
}

getMovies()
