let btnSearch = document.getElementById('btn-search');
let btnRoute = document.getElementById('btn-route');

let origin = document.getElementById('origin');
let destiny = document.getElementById('destiny');
let placeSearch, autocomplete;

btnSearch.addEventListener('click', searchPosition);
btnRoute.addEventListener('click', searchRoute);

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  initAutocomplete();
  
  let pos = {
    lat: -12.020651498087096,
    lng: -76.93456887128904
  }
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: pos
  });
  let marker = new google.maps.Marker({
    position: pos,
    map: map,
    // animaciones en marcadores
    // label : 'A',
    title: "Estoy aqui",
    animation: google.maps.Animation.DROP,

  });
  searchRoute(directionsService,directionsDisplay);
}

function initAutocomplete() {
  
  let autocompleteorigin = new google.maps.places.Autocomplete(origin);
  let autocompleteDestiny = new google.maps.places.Autocomplete(destiny);


}

function searchRoute(directionsService, directionsDisplay){
  directionsService.route({
    origin: origin.value,
    destination: destiny.value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Ingrese direcciones');
    }
  });
}







function searchPosition() {

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      let myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: myPosition
      });
      let marker = new google.maps.Marker({
        position: myPosition,
        map: map,


      });

    });

  } else {
    console.log('Su navegador no soporta Geolocalización')
  }
}