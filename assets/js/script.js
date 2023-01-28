$( document ).ready(function() {
    
     // Searched cities are added to the search history (localStorage) and persist between refreshes of a page.
     let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

     
    //Display the current date
    const DateTime = luxon.DateTime;
    const today = DateTime.now().setZone("system");
    let currentDate = today.toLocaleString(DateTime.DATE_SHORT);
    
    // When a user searches for a city they are presented with current and future weather conditions for that city
    const key = "dcbf10813d2cfd90e585dbc6c1042563";
    

    // Adds a click event to Submit button to search city
    $('#search-button').on('click', function(e) {
        
        e.preventDefault();

        // addCityBtn();

        let cityInput = $('#search-input').val();

        searchHistory.push(cityInput)
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

        // Clear input text
        $('#search-input').val('');
        // Clear previous forecast cards
        $('.forecast-cards').html('');
        
        let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}&units=metric`;
        
        function displayWeather(){
            // request current weather data
            fetch(currentWeatherURL)
            .then((response) => response.json())
            .then((data) => {
                
                    // Converts wind speed in m/s to km/h  
                    let wind = parseInt(data.wind.speed)*3.6;
                    
                    // Create link for the weather icon source (img src)
                    let iconSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
                    let temp = Math.round(data.main.temp);
                    let feelTemp = Math.round(data.main.feels_like);
                
                    // Current weather by city shows city name, date, weather, temperature, humidity and wind speed (html template)
                    const currentWeather = $(
                    `
                    <h2 class="fw-bold">${data.name} ${currentDate}</h2>
                    <img style="width:70px" alt='weather icon' src="${iconSrc}"/>
                    <p>Temp: ${temp} ℃</p>
                    <p>Feels like: ${feelTemp} ℃</p>
                    <p>Wind: ${wind} KM/H</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    </div>
                    `
                    );
                    
                    $('#today').html(currentWeather);
                    
                    // 5-day-forecast URL with latitud and longitude from currentWeather ajax call (metric system and limit of 5 timestamps)
                    let forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${key}`;
                    
                    // request 5 day forecast data
                    fetch(forecastQueryURL)
                    .then((response) => response.json())
                    .then((data) => {
                        
                        const fiveDayForecast = {};  
                        
                        for(let forecastDay of data.list) {
                            
                            // Separate date from time in dt_txt string (split returns 2 arrays, one for date one for time)
                            const date = forecastDay.dt_txt.split(" ")[0];
                            const time = forecastDay.dt_txt.split(" ")[1];
                            
                            if (!fiveDayForecast[date]) {
                                fiveDayForecast[date] = {
                                    temp_min: forecastDay.main.temp_min,
                                    temp_max: forecastDay.main.temp_max,
                                    wind: forecastDay.wind.speed,
                                    humidity: forecastDay.main.humidity,
                                    icon: forecastDay.weather[0].icon,
                                    description: forecastDay.weather[0].description,
                                }  
                                
                            } else {
                            // Iterates through each 3h min and max temps and returns the lowest and the highest temp for each day 
                            if(forecastDay.main.temp_min < fiveDayForecast[date].temp_min) {
                                    fiveDayForecast[date].temp_min = forecastDay.main.temp_min;
                            }
                            if(forecastDay.main.temp_max > fiveDayForecast[date].temp_max) {
                                fiveDayForecast[date].temp_max = forecastDay.main.temp_max;
                                }
                                
                            }
                            // if the 12pm data is available, display the 12pm day-time icon
                            if (time === "12:00:00") {
                                fiveDayForecast[date].icon = forecastDay.weather[0].icon;
                            }

                        }

                        //console.log(fiveDayForecast);

                        for (let day in fiveDayForecast) {
                            
                            const luxonDate = DateTime.fromISO(day).toLocaleString(DateTime.DATE_SHORT);

                            // Skips creating a forecast card for the current date
                            if (currentDate === luxonDate) { continue }

                            const forecastDay = fiveDayForecast[day];

                            // Converts wind speed in m/s to km/h
                            let wind = parseInt(forecastDay.wind)*3.6;

                            let iconSrc = `http://openweathermap.org/img/wn/${forecastDay.icon}.png`;
                            
                            // 5-day forecast section displays: date, weather icon, temperature and humidity
                            // Card component template for the 5 cards for 5-day-forecast
                            const forecastCard = $(
                                `
                                <div class="card m-2">
                                <h4 class="card-header">${luxonDate}</h4>
                                    <div class="card-body">
                                        <img style="width:70px" alt='${forecastDay.description}' src="${iconSrc}"/>
                                        <p>Min Temp: ${Math.round(forecastDay.temp_min)} ℃</p>
                                        <p>Max Temp: ${Math.round(forecastDay.temp_max)} ℃</p>
                                        <p>Wind: ${wind} KM/H</p>
                                        <p>Humidity: ${forecastDay.humidity}%</p>
                                    </div>
                                </div>
                                `);
                                
                            $('.forecast-cards').append(forecastCard);
                            
                        }     
                    }); 

                })

        }

        displayWeather();



        // When a user clicks on a city in the search history, current and future conditions for that city are shown again
        


        
        
        // event delegation because movie buttons are not created yet so we target the parent's buttons
        // $("#history").on("click", "button" , displayWeather)
        
    });
    
    // renderCityButtons();
});

    // // function for creating a button for each city searched
    // function addCityBtn() {

    //     let cityName = $(RESPONSE.NAME)
    
    //     const cityBtn = $(`<button><li>${cityName}}</li></button>`);
    //     cityBtn.attr("data-date", LUXON);
    //     $('#history').append(cityBtn);
    // }



    // // Function for displaying buttons for each city in search history
    // function renderCityButtons() {

    //     // loop through array
    //     // create a button for each + cityName + data-date attribute
    //     for (let city of searchHistory) {
    
            
    
    //     }
    // }