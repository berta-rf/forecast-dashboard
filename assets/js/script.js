$( document ).ready(function() {
    
    //Display the current date
    const DateTime = luxon.DateTime;
    const today = DateTime.now().setZone("system");
    let currentDate = today.toLocaleString(DateTime.DATE_SHORT);
    
    // When a user searches for a city they are presented with current and future weather conditions for that city
    const key = "dcbf10813d2cfd90e585dbc6c1042563";
    
    
    // Adds a click event to Submit button to search city
    $('#search-button').on('click', function(e) {
        
        let cityInput = $('#search-input').val();
        // Clear input text
        $('#search-input').val("");
        
        //DRoPDOWN SAVED FOR LATER ------> When name of city is entered in search bar, I get up to 5 city options in dropdown
        // let cityQueryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${key}`;
        
        e.preventDefault();
                
        let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}&units=metric`;
        
        fetch(currentWeatherURL)
            .then((response) => response.json())
            .then((data) => {

            // Converts wind speed in m/s to km/h  
            let wind = parseInt(data.wind.speed)*3.6;
            
            // Create link for the weather icon source (img src)
            let iconSrc = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
            
            // Current weather by city shows city name, date, weather, temperature, humidity and wind speed (html template)
            const currentWeather = $(
                `
                <h2 class="fw-bold">${data.name} ${currentDate}</h2>
                <img style="width:70px" alt='weather icon' src="${iconSrc}"/>
                <p>Temp: ${data.main.temp} ℃</p>
                <p>Wind: ${wind} KM/H</p>
                <p>Humidity: ${data.main.humidity}%</p>
                </div>
                `
            );
                
            $('#today').html(currentWeather);
            
            // 5-day-forecast URL with latitud and longitude from currentWeather ajax call (metric system and limit of 5 timestamps)
            let forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${key}`;
            
            
            fetch(forecastQueryURL)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                          
    

                // for (i = 0; i < response.list.length ; i++) {

                //     let forecastDay = response.list[i];
                //     // Converts wind speed in m/s to km/h 
                //     wind = parseInt(forecastDay.wind.speed)*3.6;

                //     const luxonDate = DateTime.fromSQL(forecastDay.dt_txt).toLocaleString(DateTime.DATE_SHORT);

                //     // let forecastDate;

                //     // JSON.stringify(forecastDate)

                //     wind = parseInt(forecastDay.wind.speed)*3.6;
                //     iconSrc = `http://openweathermap.org/img/w/${forecastDay.weather[0].icon}.png`

                //     // 5-day forecast section displays: date, weather icon, temperature and humidity
                //     // Card component template for the 5 cards for 5-day-forecast
                    // const forecastCard = $(
                    //     `
                    //     <div class="card m-2">
                    //     <h4 class="card-header">${luxonDate}</h4>
                    //     <img style="width:70px" alt='weather icon' src="${iconSrc}"/>
                    //     <p>Min Temp: ${forecastDay.main.temp} ℃</p>
                    //     <p>Min Temp: ${forecastDay.main.temp} ℃</p>
                    //     <p>Max Temp: ${forecastDay.main.temp} ℃</p>
                    //     <p>Wind: ${wind} KM/H</p>
                    //     <p>Humidity: ${forecastDay.main.humidity}%</p>
                    //     </div>
                    //     `
                    // );
                            
                //     $('.forecast-cards').append(forecastCard);
                    
                // }
                

            });
                
                
        });   
            
                // Searched cities are added to the search history (localStorage).                
                
                     
                
    });
            
            
            
            
            // When a user clicks on a city in the search history, current and future conditions for that city are shown again
            
            // Function for displaying buttons for each city in search history
            
            //  function renderButtons() {
            
            //     // loop through array
            //     // create a button for each + cityName + data-date attribute
            
            //     for (let city of cities) {
            
            //       let cityName = $(RESPONSE.NAME)
            //       const cityBtn = $(`<button><li>${cityName}}</li></button>`);
            //       cityBtn.attr("data-date", LUXON);
            //       $('#history').prepend(cityBtn);
            
            //     }
            //   }
            
    $('#search-input').val('Paris');
    $('#search-button').click()
            
            
});
        
        
        // event delegation because movie buttons are not created yet so we target the parent div buttons
        // $("#history").on("click", "button" , displayCurrenWeather)
        
        // function displayCurrentWeather(e) {
        
        //   e.target.preventDefault;
        
        //   let date = $(e.target).attr('data-date');
        //   // Here we construct our URL
        //   var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";
        
        //   $.ajax({
        //     url: queryURL,
        //     method: "GET"
        //   }).then(function(response) {
        
        //     // let movieInfo = JSON.stringify(response);
        
        //     let movieInfo = $(
        //       `
        //       <div>
        //       <h2>${response.Title}</h2>
        //       <img src="${response.Poster}" alt="${response.Title} poster" width="500" height="600">
        //       <p>Release date: ${response.Released}</p>
        //       <p>Plot: ${response.Plot}</p>
        //     </div>
        //       `
        //     );
        
        //     $('#movies-info').prepend(movieInfo);
        
        //   });
        // }
        