$(document).ready(function() {

    var temperature = document.querySelector("#temp");
    var humid = document.querySelector("#humid");
    var windMph = document.querySelector("#windMph");
    var uvIndex = document.querySelector("uvIndex");
    var citySearch = document.querySelector("#citySearch");
    var searchForm = document.querySelector("#searchForm");
    var fiveDay = document.getElementById("fiveDay");


    // var tempDay0 = document.querySelector("#tempDay0");
    // var tempDay1 = document.querySelector("#tempDay1");
    // var tempDay2 = document.querySelector("#tempDay2");
    // var tempDay3 = document.querySelector("#tempDay3");
    // var tempDay4 = document.querySelector("#tempDay4");


    // var humidity0 = document.querySelector("#humidity0");
    // var humidity1 = document.querySelector("#humidity1");
    // var humidity2 = document.querySelector("#humidity2");
    // var humidity3 = document.querySelector("#humidity3");
    // var humidity4 = document.querySelector("#humidity4");


    //var getCity = function(city) {

    //}

        // set the moment js to get the dates for the cities
        $("#date").text(moment().format('LL'));

    // fetch("http://api.openweathermap.org/geo/1.0/direct?q=ogden&limit=1&appid=f9ed5773e923d5279c817cf420f86c7a")
    // .then(function(response){
    //     return response.json();
    // })
    // .then(function(data){
    // console.log(data)

    // var lat = data[0].lat
    // var lon = data[0].lon

    // fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=f9ed5773e923d5279c817cf420f86c7a&units=imperial")
    // .then(function(response){
    //     return response.json();
    // })

    // .then(function(data){
    // console.log(data)
    // temperature.innerText = data.current.temp
    // humid.innerText = data.current.humidity
    // windMph.innerText = data.current.wind_speed

    // tempDay0.innerText = data.daily[0].temp.day
    // humidity0.innerText = data.daily[0].humidity

    // tempDay1.innerText = data.daily[1].temp.day
    // humidity1.innerText = data.daily[1].humidity

    // tempDay2.innerText = data.daily[2].temp.day
    // humidity2.innerText = data.daily[2].humidity

    // tempDay3.innerText = data.daily[3].temp.day
    // humidity3.innerText = data.daily[3].humidity

    // tempDay4.innerText = data.daily[4].temp.day
    // humidity4.innerText = data.daily[4].humidity

    // })
    // });

    var userInput = function(event){
        event.preventDefault();

        var userCity = citySearch.value.trim();

        if(userCity) {
            currentWeather(userCity);
            clearUserInput;
        } else{
            alert("Please enter a city!");
        }
    }

    var currentWeather = function(city){
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f9ed5773e923d5279c817cf420f86c7a";
        
        fetch(apiUrl)
        .then(function(response) {
          // request was successful
          if (response.ok) {
            response.json().then(function(data) {
              conditions(data, city);
              console.log(data);
              console.log(city);
            });
          } else {
            alert('Error: Could not get city info');
          }
        })
        .catch(function(error) {
          // Notice this `.catch()` getting chained onto the end of the `.then()` method
          alert("Unable to connect to Weather App");
        });
    };

var conditions = function(weather, city) {
    var weatherIcon = "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";

    $("#cityName").text(weather.name);
    $("#icon").attr("src", weatherIcon);
    $("#temp").text(weather.main.temp);
    $("#humid").text(weather.main.humidity);
    $("#windMph").text(weather.wind.speed);

    var latitude = weather.coord.lat;
    var longitude = weather.coord.lon;

    var uvApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=f9ed5773e923d5279c817cf420f86c7a"

    fetch(uvApi).then(function(response){
        response.json().then(function(uvIndex){
            var uv = uvIndex.current.uvi;
            $("#uvIndex").text(uv);
        })
    })

};

var clearUserInput = function() {
    var clear = fiveDay.lastElementChild
    while (clear) {
        fiveDay.removeChild(clear);
        clear = fiveDay.lastElementChild
    }
};


    searchForm.addEventListener("submit", userInput);
})


// var getCity = document

// var getCity 
// console.log[0].name


