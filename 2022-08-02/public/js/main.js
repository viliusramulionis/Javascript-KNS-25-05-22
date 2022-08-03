fetch('/api/weather')
.then(resp => resp.json())
.then(resp => {
    const app = document.getElementById('app')

    app.innerHTML = `<div class="weather">
                        <div class="image"></div>
                        <div class="degrees">${resp.degrees}</div>
                        <div class="humidity">${resp.humidity}</div>
                        <div class="location">${resp.location}</div>
                        <div class="windSpeed">${resp.windSpeed}</div>
                    </div>`
})