

// Define variables
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var city = 'London';
var apiKey = 'a9b4a8580c0d8f382ed6c59b947f9ed6';
var units = '&units=imperial';
var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
var count = "&cnt=40"
var uvUrl = "api.openweathermap.org/data/2.5/uvi?lat="





// when click event is noticed the event is first logged to console
// the tbody for the 5 day forcast is refrehed
// the location is gathered from the user
// the url is set 
// the five day forcasts loads on the bottom of the page


$('#submit').on('click', function(){
    console.log('buttonclick')
    $("#fiveday").children().remove()
    // $('.tbody').html("")
    var location = $('#query').val();
    var url = api + location + "&APPID=" + apiKey + units;
    console.log(url)
    var fiveDay = fiveDayUrl + location + "&APPID=" + apiKey + units + count;
    
    loadJson(url)
    // loadFiveDayForcast(fiveDay)
    


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
        $(".temp").html(`${temperature}&deg;`)
        $(".humidity").text(humidity)
        $(".wind-speed").text(wind)
        $(".high").text(high)
        $(".low").text(low)
        // $(".uv").text(uvIndex)

        getFiveDay(lat, long)

    })
}


function getFiveDay(lat, long){
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`;
    $.get(url).done(function(data){
        console.log(data)
        getUvIndex(data.current.uvi)

        data.daily.forEach((day,index)=>{
            if(index > 0 && index < 6){
                let container = document.getElementById("fiveday");
                let date = document.createElement("div")
                let temp = document.createElement("div")
                let card = document.createElement("div")
                let high = document.createElement("div")
                let low = document.createElement("div")

                card.appendChild(date)
                card.appendChild(temp)
                card.appendChild(high)
                card.appendChild(low)

                container.appendChild(card)
                date.innerHTML=new Date(day.dt * 1000).toLocaleDateString("en-US");
                temp.innerHTML= day.temp.day
                high.innerHTML= day.temp.max
                low.innerHTML= day.temp.min

                date.classList.add("date")
                temp.classList.add("temp")
            }

        })

    })

}

function getUvIndex(index){

    let uvSpan = ""
    
        var uvColor = index;
        if (uvColor > 0 && uvColor < 2){
            uvSpan = "green";
        } else if (uvColor > 2 && uvColor < 6){
            uvSpan = "yellow";
        } else if (uvColor > 6 && uvColor < 8){
            uvSpan = "orange";
        } else if (uvColor > 8 && uvColor < 11){
            uvSpan = "purple";
        }

        $("#uv").attr("class", uvSpan).text(uvColor)
     

    }
    









// Tbody method used to gather 5 day forcast
// I noticed that the forcast for each day is
// chaned every three hours and used that time
// stamp to parse the data to the page with a for loop


// function loadFiveDayForcast(url){
//     $.get(url).done(function(weatherData){
       
       
//         // Populates table and insert a row for each forecast
//         var forecasts = weatherData.list;
//         for (var i = 0; i < forecasts.length; i++) {
//             var forecast = forecasts[i];
//             var date = new Date(forecast.dt * 1000).toLocaleDateString("en-US");
//             var time = new Date(forecast.dt * 1000).toLocaleTimeString("en-US");
//             var row = `
//          <tr>
//          <th scope="row">${date + ' ' + time}</td>
//             <td>${forecast.main.temp}</td>
//             <td>${forecast.main.humidity}</td>
//             <td>${forecast.wind.speed}</td>
//             <td>${forecast.main.temp_max}</td>
//             <td>${forecast.main.temp_min}</td>
//           </tr>
//           `
//           $('.tbody').append(row);
//         }

//         return;

//     })    
// }