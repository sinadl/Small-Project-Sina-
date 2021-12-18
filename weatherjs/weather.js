class Weather {
    constructor(city,country){
        this.city = city;
        this.country = country;
        this.apiKey = 'ad010c884b768c210f3edc17977eb36d';
    }
    async getWeather(){
        const response = await fetch
        (`http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${this.apiKey}&units=imperial`);
        const responsePost = await response.json();
        return{
            responsePost
        }
    }

    changeLocation(city,country){
        this.city = city;
        this.country = country;
    }
}