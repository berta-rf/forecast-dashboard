$( document ).ready(function() {
    
    const key = "dcbf10813d2cfd90e585dbc6c1042563";
    let lat;
    let lon;
    
    // Adds a click event to Submit button to search city
    $('#search-button').on('click', function(e) {
        
        let cityInput = $('#search-input').val();
//DRoPDOWN SAVED FOR LATER ------> When name of city is entered in search bar, I get up to 5 city options in dropdown
        let cityQueryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${key}`;

        e.preventDefault();
        
        $.ajax({
            url: cityQueryURL,
            method: "GET"
        }).then(function(response) {

            //console.log(JSON.stringify(response));

            let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}&units=metric`;
            
            let forecastQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${response[0].lat}&lon=${response[0].lon}&appid=${key}&units=metric`;

            
            $.ajax({
                url: currentWeatherURL,
                method: "GET"
            }).then(function(response) {

                // console.log(JSON.stringify(response));

                let wind = parseInt(response.wind.speed)*3.6;
                console.log(wind)

                let iconSrc = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`
                // When a user views the current weather conditions for that city they are presented with:
                // city name, date, an icon that represents weather conditions, temperature, humidity and wind speed.
                let currentWeather = $(
                    `
                    <h2 class="display-5 fw-bold">${response.name}</h1>
                    <img style="width:70px" alt='weather icon' src="${iconSrc}"/>
                    <p>Temp: ${response.main.temp} ℃</p>
                    <p>Wind: ${wind} KM/H</p>
                    <p>Humidity: ${response.main.humidity}%</p>
                    </div>
                    `
                );
                    
                    // currentWeather.attr("data-date", date);
                    $('#today').append(currentWeather);
                    
                
            });   

                // When a user searches for a city they are presented with current and future weather conditions for that city
                // Searched cities are added to the search history (localStorage).
                
                // let forecastQueryURL = `api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${key}&units=metric`;
                
                
        });        
        
            
    });
        
        
        
        // When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
        // the date, icon representation of weather conditions, temperature and humidity.
        
        // When a user clicks on a city in the search history, current and future conditions for that city are shown again
        
        
        
        
        
        
        //     <div class="card" style="width: 18rem;">
        //     <h4 class="card-header"></h4>
        //     <ul class="list-group list-group-flush">
        //       <li class="list-group-item">Temp:</li>
        //       <li class="list-group-item">Wind:</li>
        //       <li class="list-group-item">Humidity:</li>
        //     </ul>
        //   </div>
        
        
   
        
        
});