// Global Variables
var cities = [];

$(".toggle").on("click", function(event){
   event.preventDefault();
   $("body").toggleClass("dark-mode");
   $("header").toggleClass("dark-mode");
   $("div.toggle").toggleClass("dark-mode");
})

// Determines if user clicks "SEARCH"
$("#addCity").on("click", function(event){
   event.preventDefault();
   // Gets user input
   var cityName = $("#cityInput").val().trim();
   // Adds city to cities array
   cities.push(cityName);
   // Activates search history function
   searchHistory();
   // Activates the find weather function
   findWeather(cityName);
})

function searchHistory(){
   $("#citiesHistory").empty();

   for(var i = 0; i < cities.length; i++){
      var a = $("<button>");
      var b = $("<br>");

      a.addClass("city");
      a.attr("data-name", cities[i]);
      a.text(cities[i]);

      $("#citiesHistory").append(a);
      $("#citiesHistory").append(b);
   }
}

$(document).on("click", ".city", getCityInfo);
function getCityInfo(){
   var cityName = $(this).text();
   findWeather(cityName);
}

// Gets the weather for the searched city
function findWeather(city){
   var key = "9585535e8d36d551ec1c0818b1db0ec6";
   var cityName = city
   var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;

   $.ajax({
      url: queryURL,
      method: "GET"
   }).then(function(response){
      // Logs entire info
      console.log(response);

      // Logs the name of the city
      var cityName = response.name;
      // Logs wind speed
      var speed = response.wind.speed;
      // Logs humidity
      var humidity = response.main.humidity;
      // Logs temperature
      var tempKelvin = response.main.temp;
      var tempFar = parseInt((tempKelvin - 273.15) * 1.80 + 32);
      // Logs the icon descriptor
      var iconData = response.weather[0].icon;
      var img = $('<img />', {
         class: 'weatherImg',
         src: 'https://openweathermap.org/img/wn/' + iconData + '@2x.png',
         alt: 'an image showing the weather'
      });
      // Logs lat and lon
      var lon = response.coord.lon;
      var lat = response.coord.lat;

      // Code that prints data onto site
      $("#name").text(cityName);
      $("#temp").text("Temperature: " + tempFar + " °F");
      $("#humid").text("Humidity: " + humidity + "%");
      $("#speed").text("Wind Speed: " + speed + " MPH");
      $('#weatherDiv').empty()
      img.appendTo($('#weatherDiv'))

      // Api call for UV index
      var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + key;
      $.ajax({
         url: uvIndexURL,
         method: "GET"
      }).then(function(uvResponse){
         console.log(uvResponse);
         var uvIndex = uvResponse.value;
         $("#uv").text("UV Index: " + uvIndex);
      });
      
      // Api call for future weather
      var futureURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + key;
      $.ajax({
         url: futureURL,
         method: "GET"
      }).then(function(furResponse){
         $("#future-forecast-header").text("Five Day Forecast")
         console.log(furResponse);
         // Day 1
         var temp1 = furResponse.list[7].main.temp;
         var farTemp1 = parseInt((temp1 - 273.15) * 1.80 + 32);
         var humid1 = furResponse.list[7].main.humidity;
         var iconData1 = furResponse.list[7].weather[0].icon;
         var img1 = $('<img />', {
            class: 'weatherImg',
            src: 'https://openweathermap.org/img/wn/' + iconData1 + '@2x.png',
            alt: 'an image showing the weather'
         });
         var rawDate1 = furResponse.list[7].dt_txt;
         var cleanDate1 = rawDate1.slice(0, 10);
         $('#weatherDiv1').empty()
         img1.appendTo($('#weatherDiv1'));
         $("#temp1").text("Temp: " + farTemp1 + " °F");
         $("#humid1").text("Humidity: " + humid1 + "%");
         $("#day-one-header").text("Date: " + cleanDate1);

         // Day 2
         var temp2 = furResponse.list[15].main.temp;
         var farTemp2 = parseInt((temp2 - 273.15) * 1.80 + 32);
         var humid2 = furResponse.list[15].main.humidity;
         var iconData2 = furResponse.list[15].weather[0].icon;
         var img2 = $('<img />', {
            class: 'weatherImg',
            src: 'https://openweathermap.org/img/wn/' + iconData2 + '@2x.png',
            alt: 'an image showing the weather'
         });
         var rawDate2 = furResponse.list[15].dt_txt;
         var cleanDate2 = rawDate2.slice(0, 10);
         $('#weatherDiv2').empty()
         img2.appendTo($('#weatherDiv2'));
         $("#temp2").text("Temp: " + farTemp2 + " °F");
         $("#humid2").text("Humidity: " + humid2 + "%");
         $('#day-two-header').text("Date: " + cleanDate2);

         // Day 3
         var temp3 = furResponse.list[23].main.temp;
         var farTemp3 = parseInt((temp3 - 273.15) * 1.80 + 32);
         var humid3 = furResponse.list[23].main.humidity;
         var iconData3 = furResponse.list[23].weather[0].icon;
         var img3 = $('<img />', {
            class: 'weatherImg',
            src: 'https://openweathermap.org/img/wn/' + iconData3 + '@2x.png',
            alt: 'an image showing the weather'
         });
         var rawDate3 = furResponse.list[23].dt_txt;
         var cleanDate3 = rawDate3.slice(0, 10);
         $('#weatherDiv3').empty()
         img3.appendTo($('#weatherDiv3'));
         $("#temp3").text("Temp: " + farTemp3 + " °F");
         $("#humid3").text("Humidity: " + humid3 + "%");
         $('#day-three-header').text("Date: " + cleanDate3);

         // Day 4
         var temp4 = furResponse.list[31].main.temp;
         var farTemp4 = parseInt((temp4 - 273.15) * 1.80 + 32);
         var humid4 = furResponse.list[31].main.humidity;
         var iconData4 = furResponse.list[31].weather[0].icon;
         var img4 = $('<img />', {
            class: 'weatherImg',
            src: 'https://openweathermap.org/img/wn/' + iconData4 + '@2x.png',
            alt: 'an image showing the weather'
         });
         var rawDate4 = furResponse.list[31].dt_txt;
         var cleanDate4 = rawDate4.slice(0, 10);
         $('#weatherDiv4').empty()
         img4.appendTo($('#weatherDiv4'));
         $("#temp4").text("Temp: " + farTemp4 + " °F");
         $("#humid4").text("Humidity: " + humid4 + "%");
         $('#day-four-header').text("Date: " + cleanDate4);

         // Day 5
         var temp5 = furResponse.list[39].main.temp;
         var farTemp5 = parseInt((temp5 - 273.15) * 1.80 + 32);
         var humid5 = furResponse.list[39].main.humidity;
         var iconData5 = furResponse.list[39].weather[0].icon;
         var img5 = $('<img />', {
            class: 'weatherImg',
            src: 'https://openweathermap.org/img/wn/' + iconData5 + '@2x.png',
            alt: 'an image showing the weather'
         });
         var rawDate5 = furResponse.list[39].dt_txt;
         var cleanDate5 = rawDate5.slice(0, 10);
         $('#weatherDiv5').empty()
         img5.appendTo($('#weatherDiv5'));
         $("#temp5").text("Temp: " + farTemp5 + " °F");
         $("#humid5").text("Humidity: " + humid5 + "%");
         $('#day-five-header').text("Date: " + cleanDate5);
      })
   });
}