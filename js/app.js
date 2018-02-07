let btnSearch = $('#btn-search');

btnSearch.on('click', searchPosition);

function initMap() {
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

    let origin = $('#origin');
    let destiny = $('#destiny');
    new google.maps.places.Autocomplete(
        (document.getElementById('btn-search')), {
            types: ['geocode']
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