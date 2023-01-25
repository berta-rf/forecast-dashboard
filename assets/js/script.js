$( document ).ready(function() {

    const key = "dcbf10813d2cfd90e585dbc6c1042563";
    let lat;
    let lon;
    
    // Adds a click event to Submit button to search city
    $('#search-button').on('click', function(e) {

        let cityInput = $('#search-input').val();

        let cityQueryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${key}`;
        console.log(cityQueryURL);

        // When name of city is entered in search bar, I get up to 5 city options in dropdown

        e.preventDefault();

        $.ajax({
            url: cityQueryURL,
            method: "GET"
        }).then(function(response) {
                
            console.log(JSON.stringify(response));



    // When a user searches for a city they are presented with current and future weather conditions for that city
    // Searched cities are added to the search history (localStorage).

            // let currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${key}`;
            // // let forecastQueryURL = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
            // let forecastQueryURL = `api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${key}&units=metric`;



        });

    });
    
    
    // When a user views the current weather conditions for that city they are presented with:
    // city name, date, an icon that represents weather conditions, temperature, humidity and wind speed.

    // When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
    // the date, icon representation of weather conditions, temperature and humidity.

    // When a user clicks on a city in the search history, current and future conditions for that city are shown again





























});