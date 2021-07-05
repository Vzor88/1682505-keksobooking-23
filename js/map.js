import {DEFAULT_COORDINATES, fieldAddress, FLOATING_POINT_NUMBER} from './form.js';
import {activateForm} from './activate-form.js';

const myMap = L.map('map-interactive')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: Number(DEFAULT_COORDINATES.LATITUDE).toFixed(FLOATING_POINT_NUMBER),
    lng: Number(DEFAULT_COORDINATES.LONGITUDE).toFixed(FLOATING_POINT_NUMBER),
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(myMap);

const mainRedIcon = L.icon({
  iconUrl: '../../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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

mainPinMarker.on('moveend', (evt) => {
  fieldAddress.value = `${Number(evt.target.getLatLng().lat).toFixed(FLOATING_POINT_NUMBER)}, ${Number(evt.target.getLatLng().lng).toFixed(FLOATING_POINT_NUMBER)}`;
});

const markerGroup = L.layerGroup().addTo(myMap);

export {mainPinMarker,markerGroup};
