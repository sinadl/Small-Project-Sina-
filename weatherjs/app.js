const weather = new Weather('Boston','US');
const ui = new UI();

document.addEventListener('DOMContentLoaded', getWeather);


function getWeather(){
    weather.getWeather()
        .then(result => {
            console.log(result);
            ui.paint(result);
        })
        .catch(err => console.log(err))
}