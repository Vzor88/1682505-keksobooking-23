import {DEFAULT_COORDINATES, fieldAddress, FLOATING_POINT_NUMBER} from './form.js';
import {activateForm} from './activate-form.js';
import {loadAdvert} from './main.js';

const MAP_ZOOM = 12;
const myMap = L.map('map-interactive');

const RED_MARKER = {
  SIZE: {
    WIDTH: 52,
    HEIGHT: 52,
  },
  ANCHOR: {
    WIDTH: 26,
    HEIGHT: 52,
  },
};

const BLUE_MARKER = {
  SIZE: {
    WIDTH: 40,
    HEIGHT: 40,
  },
  ANCHOR: {
    WIDTH: 20,
    HEIGHT: 52,
  },
};

const loadMap = () => {
  myMap.on('load', () => {
    activateForm();
    loadAdvert();
  } )
    .setView({
      lat: Number(DEFAULT_COORDINATES.LATITUDE).toFixed(FLOATING_POINT_NUMBER),
      lng: Number(DEFAULT_COORDINATES.LONGITUDE).toFixed(FLOATING_POINT_NUMBER),
    }, MAP_ZOOM);
};

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(myMap);

const mainRedIcon = L.icon({
  iconUrl: '../../img/main-pin.svg',
  iconSize: [RED_MARKER.SIZE.WIDTH, RED_MARKER.SIZE.HEIGHT],
  iconAnchor: [RED_MARKER.ANCHOR.WIDTH, RED_MARKER.ANCHOR.HEIGHT],
});

const mainPinMarker = L.marker(
  {
    lat: Number(DEFAULT_COORDINATES.LATITUDE).toFixed(FLOATING_POINT_NUMBER),
    lng: Number(DEFAULT_COORDINATES.LONGITUDE).toFixed(FLOATING_POINT_NUMBER),
  },
  {
    draggable: true,
    icon: mainRedIcon,
  },
);

mainPinMarker.addTo(myMap);

const getValidCoordinates = (lat, lng) => `${Number(lat).toFixed(FLOATING_POINT_NUMBER)}, ${Number(lng).toFixed(FLOATING_POINT_NUMBER)}`;

mainPinMarker.on('move', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  fieldAddress.value = getValidCoordinates(lat, lng);
});

const markerGroup = L.layerGroup().addTo(myMap);

const addMapMarker = (coordinateLat, coordinateLng, itemCard) => {
  const pinBlueIcon = L.icon({
    iconUrl: '../../img/pin.svg',
    iconSize: [BLUE_MARKER.SIZE.WIDTH, BLUE_MARKER.SIZE.HEIGHT],
    iconAnchor: [BLUE_MARKER.ANCHOR.WIDTH, BLUE_MARKER.ANCHOR.HEIGHT],
  });
  const blueMarker = L.marker(
    { lat: coordinateLat,
      lng: coordinateLng,
    },
    {
      icon: pinBlueIcon,
    });
  blueMarker
    .addTo(markerGroup)
    .bindPopup(itemCard);
};

export {mainPinMarker, markerGroup, addMapMarker, loadMap};
