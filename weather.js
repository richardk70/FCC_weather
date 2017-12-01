// global variables
var farActive = 1;
var far = 0;
var cel = 0;
var id = 0;

init();

function init(){
  document.getElementById("sun").style.display = "none";
  document.getElementById("storm").style.display = "none";
  document.getElementById("clouds").style.display = "none";
  document.getElementById("rain").style.display = "none";
  document.getElementById("partly").style.display = "none";
  document.getElementById("snow").style.display = "none"; 
}

function show(){
// hide all animated weather icons
  document.getElementById("storm").style.display= "none";
  document.getElementById("clouds").style.display= "none";
  document.getElementById("rain").style.display= "none";
  document.getElementById("partly").style.display= "none";
  document.getElementById("snow").style.display= "none"; 
  document.getElementById("sun").style.display= "none";
  
  var zipCode = document.getElementById("zip").value;

  // weather information from openweatherAPI
  var apiKey = ',us&appiD=8a3546f257b155d6f8babbf970983689';
  var url = 'http://api.openweathermap.org/data/2.5/weather?zip=';

  var request = new XMLHttpRequest();
  request.open("GET", url+zipCode+apiKey, false);
  request.send();
  request = JSON.parse(request.responseText);
  var description = request.weather[0].description;
  id = request.weather[0].id;
    console.log(id);
  var kel = request.main.temp;
  cel = (kel - 273.15).toFixed(0);
  far = (kel * 1.8 - 459.67).toFixed(0);

  farActive = 1;
    
  // geolocation information from ziptastic
  var zipCode = document.getElementById("zip").value;
  var zurl = 'http://ziptasticapi.com/';
  var request2 = new XMLHttpRequest();
  request2.open("GET", zurl+zipCode, false);
  request2.send();
  request2 = JSON.parse(request2.responseText);
  var state = request2.state;
  var city = request2.city;  
  description = request.weather[0].description;
  
  // display info
  document.getElementById('description').textContent=description;
  document.getElementById("temperature").textContent = far + "° F"; 
  document.getElementById("location").textContent = city + ", " + state;

  // show weather icon
  if (id>=200 && id<300) {
    // show thunderstorm
    document.getElementById("storm").style.display= "block";
  }
  if (id>=300 && id<600) {
    // show rain
    document.getElementById("rain").style.display= "block";
  }
  if (id>=600 && id<700) {
    // show snow
    document.getElementById("snow").style.display= "block"; 
   }
  if (id==800) {
    // show sun
    document.getElementById("sun").style.display= "block";
  }
  if (id>800 && id<=803) {
    // show partly clouds
    document.getElementById("partly").style.display= "block"; 
  }
  if (id==804) {
    // show clouds
    document.getElementById("clouds").style.display= "block";
  }
}

function reset() {
	document.getElementById("myForm").reset();
}

function changeTemp() {
  console.log(farActive);
  if (farActive ==1) {
    cel = (far -32) * (5/9);
    far = 0;
    document.getElementById('temperature').textContent=cel.toFixed(0)+'° C';
    farActive = 0;
  } else {
    far = cel * 1.8+32;
    cel = 0;
    document.getElementById('temperature').textContent=far.toFixed(0)+'° F';
    farActive = 1;
  }
}