class UI{
    constructor(){
        this.location = document.getElementById('w-location');
        this.desc = document.getElementById('w-desc');
        this.string = document.getElementById('w-string');
        this.details = document.getElementById('w-details');
        this.icon = document.getElementById('w-icon');
        this.humidity = document.getElementById('w-humidity');
        this.feelslike = document.getElementById('w-feels-like');
        this.clouds = document.getElementById('w-dewpoint');
        this.wind = document.getElementById('w-wind');
    }
    paint(weather){
        this.location.textContent = `${weather.responsePost.sys.country}  -  ${weather.responsePost.name}`;
        this.desc.textContent = `${weather.responsePost.weather[0].main}`;
        this.string.innerHTML = `<strong>${weather.responsePost.main.temp} F</strong><span class="temp"><p>Max:${weather.responsePost.main.temp_max} F</p><p>Min:${weather.responsePost.main.temp_min} F</p></span>`;
        this.icon.setAttribute("src",`http://openweathermap.org/img/wn/${weather.responsePost.weather[0].icon}@2x.png`);
        this.feelslike.textContent = `feelslike: ${weather.responsePost.main.feels_like} F`;
        this.humidity.textContent = `Humidity: ${weather.responsePost.main.humidity}`;
        this.clouds.textContent = `Clouds: ${weather.responsePost.clouds.all}%`;
        this.wind.innerHTML = `wind: <strong>speed:</strong>${weather.responsePost.wind.speed} -  <strong>deg:</strong>${weather.responsePost.wind.deg} - <strong>gust:</strong>${weather.responsePost.wind.gust}`;
        const oldweather = weather.responsePost.weather[0].main;
        document.querySelector(".main-bg").classList.remove(oldweather);
        document.querySelector(".main-bg").classList.add(`${oldweather}`);
    }
}