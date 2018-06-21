
var cityLAT=0;
var cityLNG=0;

function initMap() {
    var uluru = {lat: cityLAT, lng: cityLNG};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
}


function Weather() {
    var City = document.getElementById("City").value;
    var table = document.getElementById("tableWeather");
    var trs = table.getElementsByTagName("tr");
    var tds = null;

    if(City.length==0)
    {
      alert("City/Country fields must no be empty!");
    }
    else{
    axios.get("http://api.openweathermap.org/data/2.5/forecast?q="+City+"&units=metric&APPID=72aceaacec58f22e6bb2cf421cfcac24")
    .then(function (response) {
      console.log(response);
      document.getElementById("tableWeather").hidden = false;
      document.getElementById("map").hidden = false;
      cityLAT = response.data.city.coord.lat;
      cityLNG = response.data.city.coord.lon;
      var selectDay = 1;
      for(var i=0; i<trs.length;i++)
      {
        var weatherDate = response.data.list[selectDay].dt_txt;
        var Year = weatherDate[2] + weatherDate[3];
        var Month='-';
        var Day = weatherDate[8]+weatherDate[9];
        var imageID = response.data.list[selectDay].weather[0].icon;
        var imageURL = 'http://openweathermap.org/img/w/'+imageID+'.png';
        var weatherDescription =  response.data.list[selectDay].weather[0].description;
        var temp = response.data.list[selectDay].main.temp;
        var windSpeed = response.data.list[selectDay].wind.speed;
        var cloudsLevel = response.data.list[selectDay].clouds.all;
        tds = trs[i].getElementsByTagName("th");
        switch((weatherDate[5]+weatherDate[6]))
        {
          case "01":
            Month = 'Jan';
            break;
          case "02":
            Month = 'Feb';
            break;
          case "03":
            Month = 'Mar';
            break;
          case "04":
            Month = 'Apr';
            break;
          case "05":
            Month = 'May';
            break;
          case "06":
            Month = 'Jun';
            break;
          case "07":
            Month = 'Jul';
            break;
          case "08":
            Month = 'Aug';
            break;
          case "09":
            Month = 'Sep';
            break;
          case "10":
            Month = 'Oct';
            break;
          case "11":
            Month = 'Nov';
            break;
          case "12":
            Month = 'Dec';
            break;
         }
         switch(weatherDate[9])
         {
          case "1":
            Day+="-st ";
            break;
          case "2":
            Day += "-nd ";
            break;
          case "3":
            Day += "-rd ";
            break;
          default:
            Day+="-th ";
         }
        tds[0].innerHTML = Month + " " + Day + Year;
        tds[1].innerHTML ="<img src="+imageURL+">"+'<br>' + weatherDescription + '<br>' +"Temperature: "+ temp + " C" +'<br>' + "Wind Speed: "+ windSpeed +"m/sec"+" Clouds: "+cloudsLevel+"%";
        selectDay += 8;
      }
      initMap();
    })
    .catch(function (error) {
      alert("This city was not found. Please, enter corect one.");
    });
  }
}