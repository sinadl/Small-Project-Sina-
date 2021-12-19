const ui = new UI();
const storage = new Storage();
const weatherLocation = storage.getLocationData();
const weather = new Weather( weatherLocation.city , weatherLocation.country);

document.addEventListener('DOMContentLoaded', getWeather);

document.getElementById('w-change-btn').addEventListener('click', (e) =>{
    const city = document.getElementById('city').value;
    const country = document.getElementById('state').value;
    weather.changeLocation(city,country);
    getWeather();
    $('#locModal').modal('hide');
    storage.setLocationData(city,country);
});
function getWeather(){
    weather.getWeather()
        .then(result => {
            console.log(result);
            ui.paint(result);
        if(result.responsePost.cod == '404'){
                console.log("city not found!!!")
        }
        })
        .catch(err => console.log(err))
}