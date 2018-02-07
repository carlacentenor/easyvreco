let btnSearch = document.getElementById('btn-search');
let btnRoute = document.getElementById('btn-route');
let maps = document.getElementById('map');
let origin = document.getElementById('origin');
let destiny = document.getElementById('destiny');
let placeSearch, autocomplete;
let iconBase = 'assets/images/bicicleta.png';
btnSearch.addEventListener('click', searchPosition);

function initMap() {
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  
  initAutocomplete();
  
  let pos = {
    lat: -12.020651498087096,
    lng: -76.93456887128904
  };
  let map = new google.maps.Map(maps, {
    zoom: 5,
    center: pos
  });
  let marker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: iconBase,
   
    
    animation: google.maps.Animation.DROP,

  });

  directionsDisplay.setMap(map);
  const onChangeHandler = ()=> {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  btnRoute.addEventListener('click', onChangeHandler);
}


function initAutocomplete() {
  let autocompleteorigin = new google.maps.places.Autocomplete(origin);
  let autocompleteDestiny = new google.maps.places.Autocomplete(destiny);
}


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: origin.value,
    destination: destiny.value,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Ingrese direcciones correctas');
    }
  });
}

function clearInput() {
  origin.value = '';
  destiny.value = '';
}


function searchPosition() { 
  clearInput();
  if (navigator.geolocation) {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    navigator.geolocation.getCurrentPosition((position) => {
      let myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      let map = new google.maps.Map(maps, {
        zoom: 18,
        center: myPosition
      });
      let marker = new google.maps.Marker({
        position: myPosition,
        map: map,
        icon: iconBase,
        title: 'Estoy aqui',
        animation: google.maps.Animation.DROP,

      });
      directionsDisplay.setMap(map);
      const onChangeHandler = ()=> {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      btnRoute.addEventListener('click', onChangeHandler);
    });
  } else {
    console.log('Su navegador no soporta Geolocalización');
  }
}

