/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [40.000, -75.1260],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

dataset = "https://raw.githubusercontent.com/yufeiy6/Data/master/city_landmarks.geojson";

//set styles
var myStyle = function(feature) {
  switch (feature.properties.feat_type) {
    case 'Park': return {color: '#01B6AD', fillColor:'#01B6AD', fillOpacity: 0.7, weight:0.5};
    case 'Historic Landmark': return {color: '#FF6600', fillColor:'#FF6600', fillOpacity: 0.7};
    case 'Community Center': return {color: '#00275E', fillColor:'#00275E', fillOpacity: 0.7};
    case 'House of Worship': return {color: '#6D98AB', fillColor:'#6D98AB', fillOpacity: 0.7};
    case 'Cemetery': return {color: '#E5DB2C', fillColor:'#E5DB2C', fillOpacity: 0.7, weight:0.5};
    default: return {fillColor: '#b3cccc'};
  }
};

//Set data for each slide
slide0 =function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData, {
      style:myStyle,
      filter:function(feature, layer) {
          return (feature.properties.feat_type === "Park" || feature.properties.feat_type === "Historic Landmark" || feature.properties.feat_type === "Community Center" || feature.properties.feat_type === "House of Worship" || feature.properties.feat_type === "Cemetery");
          }
    }).addTo(map);
  });
};



var slide1 =function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup.clearLayers();
    featureGroup = L.geoJson(parsedData, {
          style: myStyle,
          filter: function(feature, layer) {
              return (feature.properties.feat_type === "Park");
              }
          }).addTo(map);
  });
};


var slide2 =function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup.clearLayers();
    featureGroup = L.geoJson(parsedData, {
          style: myStyle,
          filter: function(feature, layer) {
              return (feature.properties.feat_type === "Historic Landmark");
              }
          }).addTo(map);
  });
};


var slide3 =function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup.clearLayers();
    featureGroup = L.geoJson(parsedData, {
          style: myStyle,
          filter: function(feature, layer) {
              return (feature.properties.feat_type === "Community Center");
              }
          }).addTo(map);
  });
};


var slide4 =function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup.clearLayers();
    featureGroup = L.geoJson(parsedData, {
          style: myStyle,
          filter: function(feature, layer) {
              return (feature.properties.feat_type === "House of Worship");
              }
          }).addTo(map);
  });
};

var slide5 =function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup.clearLayers();
    featureGroup = L.geoJson(parsedData, {
          style: myStyle,
          filter: function(feature, layer) {
              return (feature.properties.feat_type === "Cemetery");
              }
          }).addTo(map);
  });
};


//Define slides and include texts to show for each slide
var slides = [
  {title: " ", text: " ", color: "#bee2ef"},
  {title: "Parks", text: "The map shows the location of the parks. Go visit them on holidays!", color: "#bee2ef"},
  {title: "Historic Landmarks", text: "The map shows the location of the historic landmarks. Go visit them on holidays!", color: "#bee2ef"},
  {title: "Community Centers", text: "The map shows the location of the community centers. Go visit them on holidays!", color: "#bee2ef"},
  {title: "Houses of Worship", text: "The map shows the location of the houses of worship. Go visit them on holidays!", color: "#bee2ef"},
  {title: "Cemeteries", text: "The map shows the location of the cemeteries. Go visit them on holidays!", color: "#bee2ef  "}
];
var currentSlide = 0;


var addTitle = (title) => {
  $('.sidebar').append(`<h1 id='results1'>${title}</h1>`);
};

var addText = (text) => {
  $('.sidebar').append(`<p id='results2'>${text}</p>`);
};

var setColor = (color) => {
  $('#map').css('background-color', color);
};

var cleanup = () => {
  $('#results1').remove();
  $('#results2').remove();
};


var buildSlide = (slideObject) => {
  cleanup();
  addTitle(slideObject.title);
  addText(slideObject.text);
  setColor(slideObject.color);
};


//Show Slide 0 when refresh
$(document).ready(function() {
  currentSlide = 0;
  buildSlide0(slides[currentSlide]);
    });

slide0();

$('#back').hide();
//Create next-page button and back-to-homepage button

$("#next").click(() => {
  $("#back").show();
  if (currentSlide < 5) {
  currentSlide = currentSlide + 1;
  buildSlide(slides[currentSlide]);
  switch(currentSlide) {
  case 0:
    slide0();
    break;
  case 1:
    slide1();
    break;
  case 2:
    slide2();
    map.setView([39.967289, -75.160436],13);
  break;
  case 3:
    slide3();
    map.setView([40.000, -75.1260],11);
    break;
  case 4:
      slide4();
      break;
  case 5:
    $("#next").hide();
    slide5();
  }
}
});



$("#back").click(() => {
  $("#next").show();
  if (currentSlide > 0) {
  currentSlide = currentSlide - 1;
  buildSlide(slides[currentSlide]);
  switch(currentSlide) {
  case 0:
    slide0();
    break;
  case 1:
    slide1();
    map.setView([40.000, -75.1260],11);
    break;
  case 2:
    slide2();
    map.setView([39.967289, -75.160436],13);
  break;
  case 3:
    slide3();
    break;
  case 4:
    slide4();
  case 5:
    slide5();
  }
}
  if (currentSlide === 0){
  $("#back").hide();
}
});
