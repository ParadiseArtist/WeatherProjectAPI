//Declare local variables

// Degree type Celsius to farenheit switch function

// Place Data /Render HTML from the Degree function

//Backgroung image array



//Get JSON location

  // Get JSON Weather
    //Toggle c/F function
    //Place Data
    //Set Background


$(function(){

  let C = false;

  let apiData;

  backgroundImg = [
    'Images/emil-jarfelt-131276-unsplash.jpg',
    'Images/loren-gu-146847-unsplash.jpg',
    'Images/max-bender-510413-unsplash.jpg',
    'Images/freestocks-org-188096-unsplash.jpg',
    'Images/todd-diemer-253577-unsplash.jpg',
    'Images/adriel-kloppenburg-14831-unsplash.jpg'
  ]

  function displayTemp (F,C) {
    if(C) return Math.round((F-32)*(5/9))+ '&deg; C';
    return Math.round(F) + '&deg; F';
  }


  function render(data, C) {
    let currentWeather = data.weather[0].description;
    let currentTemp = displayTemp(data.main.temp, C);
    let icon = data.weather[0].icon;

    $('#currentTemp').html(currentTemp);
    $('#currentWeather').html(currentWeather);

    let apiIcon = 'https://openweathermap.org/img/w/'+icon+'.png';
    $('#currentTemp').prepend('<img src=' + apiIcon +'>');
  }

  $.getJSON('https://freegeoip.net/json/').done(function(location) {
    //need to overwrite some HTML
    $('#country').html(location.country_name);
    $('#city').html(location.city);
    $('#latitude').html(location.latitude);
    $('#longitude').html(location.longitude);

    $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat='+location.latitude+'&lon='+location.longitude+'&units=imperial&appid=6a939f95b8fc421970e1105be3039ddc', function (data){
      apiData = data;


      $('#toggle').click(function(){
        C = !C;
        render(data, C);
      })

      let id = data.weather[0].id;
      let bgIndex;
      backgroundId = [299,499,599,699,799,800];

      backgroundId.push(id);
      bgIndex = backgroundId.sort().indexOf(id);

      $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')');
      render(data, C);
    })
  })
});
