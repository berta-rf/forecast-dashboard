$( document ).ready(function() {

    //Display the current date
    const dateTime = luxon.DateTime;
    const today = dateTime.now().setZone("system");
    let currentDate = today.toLocaleString(dateTime.DATE_SHORT);
    console.log(today);

// When a user searches for a city they are presented with current and future weather conditions for that city
    const key = "dcbf10813d2cfd90e585dbc6c1042563";
    let lat;
    let lon;
    
    // Adds a click event to Submit button to search city
    $('#search-button').on('click', function(e) {
        
        let cityInput = $('#search-input').val();
        // Clear input text
        $('#search-input').val("");

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

                // Converts wind speed in m/s to km/h  
                let wind = parseInt(response.wind.speed)*3.6;
                console.log(wind)

                // Create URL for the weather icon source (img src)
                let iconSrc = `http://openweathermap.org/img/w/${response.weather[0].icon}.png`

                // Current weather by city shows city name, date, weather, temperature, humidity and wind speed
                const currentWeather = $(
                    `
                    <h2 class="fw-bold">${response.name} ${currentDate}</h2>
                    <img style="width:70px" alt='weather icon' src="${iconSrc}"/>
                    <p>Temp: ${response.main.temp} ℃</p>
                    <p>Wind: ${wind} KM/H</p>
                    <p>Humidity: ${response.main.humidity}%</p>
                    </div>
                    `
                );

                    // currentWeather.attr("data-date",LUXON);
                    $('#today').html(currentWeather);
                    
                
            });   

                // Searched cities are added to the search history (localStorage).
                
                // let forecastQueryURL = `api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${key}&units=metric`;
                
                
        });        
        
            
    });
        
        
        
        // 5-day forecast section displays: date, weather icon, temperature and humidity


        // //    const forecastCard = $(
        //     `
        //      <div class="card" style="width: 18rem;">
        // //         <h4 class="card-header"></h4>
        // //          <p>Temp: ${response.main.temp} ℃</p>
        // //          <p>Wind: ${wind} KM/H</p>
        // //          <p>Humidity: ${response.main.humidity}%</p>
        // //     </div>
        //     `
        //     );
        
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
        