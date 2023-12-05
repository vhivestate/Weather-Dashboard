$(document).ready(function() {

    var citySearch = document.querySelector("#citySearch");
    var searchForm = document.querySelector("#searchForm");
    var fiveDay = document.getElementById("fiveDay");
    //parsing string to make it an array
    var history = JSON.parse(localStorage.getItem("history")) || [];
    var historySection = document.getElementById("history");


        // using moment js to get the dates for the cities
        $("#date").text(moment().format('LL'));

    var userInput = function(event){
        event.preventDefault();
        //gets user input city info
        var userCity = citySearch.value.trim();
        // adding cities to history array using push method
        history.push(userCity);
        console.log(history);

        //Stringifing array & saving cities searched to local storage
        localStorage.setItem("history", JSON.stringify(history));
        displayHistory();

        if(userCity) {
            currentWeather(userCity);
            clearUserInput;
        } 

        else{
            alert("Please enter a city!");
        }
        
    }

    //Displaying cities searched for recent history
    var displayHistory = function(){

        //clears previous search so it doesn't loop and create same city btn after every search
        historySection.innerHTML = "";

        for (let i = 0; i < history.length; i++) {
            console.log(history[i])
            // creating btns for each city searched
            var historyCity = document.createElement("button");
            historyCity.textContent = history[i];
            
            historySection.appendChild(historyCity);

            //get recent search 
            historyCity.addEventListener("click", function(){ 
                citySearch.value = history[i];
            });

        }
    }
    displayHistory();


    //city searched api
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
          alert("Unable to connect to Weather App");
        });
    };

var conditions = function(weather, city) {
    //gets weather icon for city searched
    var weatherIcon = "https://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";

    $("#cityName").text(weather.name);
    $("#icon").attr("src", weatherIcon);
    $("#temp").text(weather.main.temp);
    $("#humid").text(weather.main.humidity);
    $("#windMph").text(weather.wind.speed);

    var latitude = weather.coord.lat;
    var longitude = weather.coord.lon;

    var uvApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&units=imperial&appid=f9ed5773e923d5279c817cf420f86c7a"
    //fetch requested for UV index
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
                        //creating 5 day forecast cards
                        var createCard = document.createElement("div");
                        createCard.classList = "card bg-secondary col-2";
                        // dates on 5 day forecast
                        var createDate = document.createElement("h4");
                        createDate.classList = "card-header fs-6 text-light";
                        createDate.textContent = hrMoment.format("MMM Do YY");

                        var forecastIcon = document.createElement("img");
                        fiveDayIcons = "https://openweathermap.org/img/w/" + apiList.weather[0].icon + ".png";
                        $(forecastIcon).attr("src", fiveDayIcons);

                        var fiveDayTemp = document.createElement("p");
                        fiveDayTemp.classList = "fs-6 text-light";
                        fiveDayTemp.textContent = "Temp:" + apiList.main.temp + "°F";

                        var fiveDayHumid = document.createElement("p");
                        fiveDayHumid.classList = "fs-6 text-light";
                        fiveDayHumid.textContent = "Humidity:" + apiList.main.humidity + "%";

                        var fiveDayWind = document.createElement("p");
                        fiveDayWind.classList = "fs-6 text-light";
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



