$(document).ready(function() {

    var temperature = document.querySelector("#temp");
    var humid = document.querySelector("#humid");
    var windMph = document.querySelector("#windMph");
    var uvIndex = document.querySelector("uvIndex");
    var citySearch = document.querySelector("#citySearch");
    var searchForm = document.querySelector("#searchForm");
    var fiveDay = document.getElementById("fiveDay");


        // set the moment js to get the dates for the cities
        $("#date").text(moment().format('LL'));

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

            if(uv <= 2) {
                $("#uvIndex").removeClass("bg-danger");
                $("#uvIndex").removeClass("bg-warning");
                $("#uvIndex").addClass("bg-success");
            } else if(uv >= 2 && uv <= 7) {
                $("#uvIndex").removeClass("bg-success");
                $("#uvIndex").removeClass("bg-danger");
                $("#uvIndex").addClass("bg-warning");
            } else {
                $("#uvIndex").removeClass("bg-success");
                $("#uvIndex").removeClass("bg-warning");
                $("#uvIndex").addClass("bg-danger");
            }
        })
        genFive(city, latitude, longitude);
    })

    var genFive = function(city, latitude, longitude) {
        var fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=f9ed5773e923d5279c817cf420f86c7a";
        fetch(fiveDayApi).then(function(response){
            response.json().then(function(fiveDayList){
                console.log(fiveDayList);

                clearUserInput();
                for(var i=0; i < fiveDayList.list.length; i++) {
                    var apiList = fiveDayList.list[i];
                    var fiveDayDate = apiList.dt;
                    var timeZone = fiveDayList.city.timezone;
                    var setHrs = timeZone/60/60;
                    var hrMoment = moment.unix(fiveDayDate).utc().utcOffset(setHrs);

                    if(hrMoment.format('HH:mm') >= "11:00" && hrMoment.format('HH:mm') <= "13:00") {

                        var createCard = document.createElement("div");
                        createCard.classList = "card bg-secondary col-2";

                        var createDate = document.createElement("h4");
                        createDate.classList = "card-header text-light";
                        createDate.textContent = hrMoment.format("MMM Do YY");

                        var forecastIcon = document.createElement("img");
                        fiveDayIcons = "https://openweathermap.org/img/w/" + apiList.weather[0].icon + ".png";
                        $(forecastIcon).attr("src", fiveDayIcons);

                        var fiveDayTemp = document.createElement("p");
                        fiveDayTemp.classList = "fs-5 text-light";
                        fiveDayTemp.textContent = "Temp:" + apiList.main.temp + "°F";

                        var fiveDayHumid = document.createElement("p");
                        fiveDayHumid.classList = "fs-5 text-light";
                        fiveDayHumid.textContent = "Humidity:" + apiList.main.humidity + "%";

                        var fiveDayWind = document.createElement("p");
                        fiveDayWind.classList = "fs-5 text-light";
                        fiveDayWind.textContent = "Wind:" + apiList.wind.speed + "MPH";

                        fiveDay.appendChild(createCard);
                        createCard.appendChild(createDate);
                        createCard.append(forecastIcon);
                        createCard.appendChild(fiveDayHumid);
                        createCard.appendChild(fiveDayTemp);
                        createCard.appendChild(fiveDayWind);
                    }
                }
            })
        })

    }

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


