/*
date: 04/26/2019
author: Su Ming Yi
goal: create dropdown in html for the user to select

*/


function setcities_D() {
  stateSel = document.getElementById('State_D'); //set stateSel to global variable
  cityList = cities[stateSel.value];
  //console.log(cityList);
  selectedDepState = stateSel.value;
  changeSelect('city_D', cityList, cityList);
  //console.log("Hello World");
  // get flight information
  FlightInfo();
}

function setcities_A() {
  stateSel = document.getElementById('State_A'); //set stateSel to global variable
  cityList = cities[stateSel.value];
  selectedArrState = stateSel.value;
  changeSelect('city_A', cityList, cityList);
  // get flight information
  FlightInfo();
}

function changeSelect(fieldID, newOptions, newValues) {
  selectField = document.getElementById(fieldID);
  selectField.options.length = 0;
  for (i=0; i<newOptions.length; i++) {
    selectField.options[selectField.length] = new Option(newOptions[i], newValues[i]);
  }
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

addLoadEvent(function() {
	setcities_D();
	setcities_A();
	setairportID_D();
	setairportID_A();
});


function setairportID_D() {
  stateSel = document.getElementById('city_D'); //set stateSel to global variable
  airportIDList = airportID[stateSel.value];
  selectedDepCity = stateSel.value;
  changeSelect('airportID_D', airportIDList, airportIDList);
  set_D();
  // get flight information
  FlightInfo();
}

function setairportID_A() {
  stateSel = document.getElementById('city_A'); //set stateSel to global variable
  airportIDList = airportID[stateSel.value];
  selectedArrCity = stateSel.value;
  changeSelect('airportID_A', airportIDList, airportIDList);
  set_A();
  // get flight information
  FlightInfo();
}

function set_D() {
  stateSel = document.getElementById('airportID_D');
  airportIDList = airportID[stateSel.value];
  selectedDepAirportID = stateSel.value;
}

function set_A() {
  stateSel = document.getElementById('airportID_A'); //set stateSel to global variable
  airportIDList = airportID[stateSel.value];
  selectedArrAirportID = stateSel.value;

}