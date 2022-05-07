var temperature = document.querySelector("#temp");
var humid = document.querySelector("#humid");
var windMph = document.querySelector("#windMph");
var uvIndex = document.querySelector("uvIndex");

var tempDay0 = document.querySelector("#tempDay0");
var tempDay1 = document.querySelector("#tempDay1");
var tempDay2 = document.querySelector("#tempDay2");
var tempDay3 = document.querySelector("#tempDay3");
var tempDay4 = document.querySelector("#tempDay4");


var humidity0 = document.querySelector("#humidity0");
var humidity1 = document.querySelector("#humidity1");
var humidity2 = document.querySelector("#humidity2");
var humidity3 = document.querySelector("#humidity3");
var humidity4 = document.querySelector("#humidity4");


var getWeather = function(weather) {

}

fetch("http://api.openweathermap.org/geo/1.0/direct?q=ogden&limit=1&appid=f9ed5773e923d5279c817cf420f86c7a")
.then(function(response){
    return response.json();
})
.then(function(data){
console.log(data)

var lat = data[0].lat
var lon = data[0].lon

fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=f9ed5773e923d5279c817cf420f86c7a&units=imperial")
.then(function(response){
    return response.json();
})
.then(function(data){
console.log(data)
temperature.innerText = data.current.temp
humid.innerText = data.current.humidity
windMph.innerText = data.current.wind_speed

tempDay0.innerText = data.daily[0].temp.day
humidity0.innerText = data.daily[0].humidity

tempDay1.innerText = data.daily[1].temp.day
humidity1.innerText = data.daily[1].humidity

tempDay2.innerText = data.daily[2].temp.day
humidity2.innerText = data.daily[2].humidity

tempDay3.innerText = data.daily[3].temp.day
humidity3.innerText = data.daily[3].humidity

tempDay4.innerText = data.daily[4].temp.day
humidity4.innerText = data.daily[4].humidity

})
})

