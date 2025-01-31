var map = L.map('map').setView([4.41445, 101.38683], 15);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// var marker = L.marker([20.5999502362187, 72.93273815075568]).addTo(map);

// var circle = L.circle([20.5999502362187, 72.93273815075568], {
//     color: 'green',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

// const point1 = L.latLng(20.5999502362187, 72.93273815075568);
// const point2 = L.latLng(20.5999502362187, 72.00273815075568);

// const line = L.polyline([point1, point2], { color: 'green' }).addTo(map);

// const distance = point1.distanceTo(point2);

// line.bindPopup(`Distance: ${(distance/1000).toFixed(2)} km`).openPopup();




// const p1=L.latLng(20.7676767,72.9554955);
// const p2=L.latLng(21.766767,72.9595955);

// const line2=L.polyline([p1,p2], {color:'red'}).addTo(map);

// const distance2=p1.distanceTo(p2);

// line2.bindPopup(`Distance: ${(distance2/1000).toFixed(2)} km`).openPopup();




const path = L.polyline([], { color: 'red', weight: 5 }).addTo(map);

var vehicleIcon = L.icon({
    iconUrl: 'delivery-truck.png',
    iconSize: [35, 35]
});
const vehicleMarker = L.marker([4.41445, 101.38683], { icon: vehicleIcon }).addTo(map);


let totalDistance = 0;
let currentIndex = 0;

function updateVehicleLocation() {
    if (currentIndex < vehicleLocations.length - 1) {
        const newLocation = L.latLng(vehicleLocations[currentIndex]);
        const nextLocation = L.latLng(vehicleLocations[currentIndex + 1]);

        path.addLatLng(newLocation);
        vehicleMarker.setLatLng(newLocation);
        map.panTo(newLocation);

        totalDistance += newLocation.distanceTo(nextLocation);

        currentIndex++;
    } else {
        clearInterval(intervalId);
    }
}

const intervalId = setInterval(updateVehicleLocation, 40);

var popup = L.popup(); 
function onMapClick(e){
    const startLocation=L.latLng(vehicleLocations[0]);
    const currentLocation=e.latlng;
    const ttl=startLocation.distanceTo(currentLocation);
    popup.setLatLng(e.latlng)
    .setContent("Covered " + (ttl/1000).toFixed(2)+" km from start point")
    .openOn(map);
}
path.on('mouseover', onMapClick);

function onVehicleClick(e){
    popup.setLatLng(e.latlng)
      .setContent("Vehicle Covered "+(totalDistance/1000).toFixed(2)+" KM")
      .openOn(map)
}
vehicleMarker.on('click',onVehicleClick);

