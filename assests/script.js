


var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'London';
var apiKey = '&APPID=a9b4a8580c0d8f382ed6c59b947f9ed6';
var units = '&units=imperial';
var fiveDayUrl = "http://api.openweathermap.org/data/2.5/forecast?q="
var count = "&cnt=40"


function weatherAsk(){
    var url = api + input.value() + apiKey;
    loadJson(url, gotData)
    console.log(url)
}

$('#submit').on('click', function(){
    console.log('buttonclick')
    var location = $('#query').val();
    var url = api + location + apiKey + units;
    var fiveDay = fiveDayUrl + location + apiKey + units + count;
    loadJson(url)
    loadFiveDayForcast(fiveDay)


})

function loadJson(url){
    $.get(url).done(function(weatherData){
        console.log(weatherData)
        
        var cityName = weatherData.name
        var temperature = weatherData.main.temp
        var humidity = weatherData.main.humidity
        var wind = weatherData.wind.speed
        var high = weatherData.main.temp_max
        var low = weatherData.main.temp_min
        


        $(".city").text(cityName)
        $(".temp").text(temperature)
        $(".humidity").text(humidity)
        $(".wind-speed").text(wind)
        $(".high").text(high)
        $(".low").text(low)
    })
}



function loadFiveDayForcast(url){
    $.get(url).done(function(weatherData){
        console.log(weatherData)
        // Populate table and insert a row for each forecast
        var forecasts = weatherData.list;
        for (var i = 0; i < forecasts.length; i++) {
            
        }
    })    
}