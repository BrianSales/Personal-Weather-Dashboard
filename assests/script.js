

// Define variables
var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'London';
var apiKey = '&APPID=a9b4a8580c0d8f382ed6c59b947f9ed6';
var units = '&units=imperial';
var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q="
var count = "&cnt=40"
var uvUrl = "api.openweathermap.org/data/2.5/uvi?lat="





// when click event is noticed the event is first logged to console
// the tbody for the 5 day forcast is refrehed
// the location is gathered from the user
// the url is set 
// the five day forcasts loads on the bottom of the page
$('#submit').on('click', function(){
    console.log('buttonclick')
    $('.tbody').html("")
    var location = $('#query').val();
    var url = api + location + apiKey + units;
    var fiveDay = fiveDayUrl + location + apiKey + units + count;
    
    loadJson(url)
    loadFiveDayForcast(fiveDay)
    


})


//data is loaded onto the page gatherd from the weather api
// within that data set i then find the varibles i want to 
// display
function loadJson(url){
    $.get(url).done(function(weatherData){
        console.log(weatherData)
        
        var cityName = weatherData.name
        var temperature = weatherData.main.temp
        var humidity = weatherData.main.humidity
        var wind = weatherData.wind.speed
        var high = weatherData.main.temp_max
        var low = weatherData.main.temp_min
        var long = weatherData.coord.lon
        var lat = weatherData.coord.lat
        // var uvIndex = " "
        console.log(long)
        console.log(lat)

        
        
        


        $(".city").text(cityName)
        $(".temp").text(temperature)
        $(".humidity").text(humidity)
        $(".wind-speed").text(wind)
        $(".high").text(high)
        $(".low").text(low)
        // $(".uv").text(uvIndex)
    })
}

// function getUvIndex(lat, lon)
//     queryUrl = "uvIndex" + lat + "&lon=" + lon + "apiKey"
//     $.ajax({
//         url: queryUrl,
//         method: "GET",
//     }).then(function (weatherData) {
//         var uvColor = response.value;
//         if (uvColor > 0 && uvColor < 2){
//             uvSpan = "green";
//         } else if (uvColor > 2 && uvColor < 6){
//             uvSpan = "yellow";
//         } else if (uvColor > 6 && uvColor < 8){
//             uvSpan = "orange";
//         } else ig (uvColor > 8 && uvColor < 11){
//             uvSpan = "purple";
//         }

//         $("<span>").attr("id", uvSpan).text(uvColor).appendTo("#uvIndex");
     

//     }
    









// Tbody method used to gather 5 day forcast
// I noticed that the forcast for each day is
// chaned every three hours and used that time
// stamp to parse the data to the page


function loadFiveDayForcast(url){
    $.get(url).done(function(weatherData){
       
       
        // Populates table and insert a row for each forecast
        var forecasts = weatherData.list;
        for (var i = 0; i < forecasts.length; i++) {
            var forecast = forecasts[i];
            var date = new Date(forecast.dt * 1000).toLocaleDateString("en-US");
            var time = new Date(forecast.dt * 1000).toLocaleTimeString("en-US");
            var row = `
         <tr>
         <th scope="row">${date + ' ' + time}</td>
            <td>${forecast.main.temp}</td>
            <td>${forecast.main.humidity}</td>
            <td>${forecast.wind.speed}</td>
            <td>${forecast.main.temp_max}</td>
            <td>${forecast.main.temp_min}</td>
          </tr>
          `
          $('.tbody').append(row);
        }

        return;

    })    
}