import {DEFAULT_COORDINATES, fieldAddress} from './form.js';
import {activateForm} from './activate-form.js';

const myMap = L.map('map-interactive')
  .on('load', () => {
    activateForm();
  })
  .setView({
    lat: Number(DEFAULT_COORDINATES.LATITUDE).toFixed(5),
    lng: Number(DEFAULT_COORDINATES.LONGITUDE).toFixed(5),
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
    lat: Number(DEFAULT_COORDINATES.LATITUDE).toFixed(5),
    lng: Number(DEFAULT_COORDINATES.LONGITUDE).toFixed(5),
  },
  {
    draggable: true,
    icon: mainRedIcon,
  },
);

mainPinMarker.addTo(myMap);

mainPinMarker.on('moveend', (evt) => {
  fieldAddress.value = `${Number(evt.target.getLatLng().lat).toFixed(5)}, ${Number(evt.target.getLatLng().lng).toFixed(5)}`;
});

const markerGroup = L.layerGroup().addTo(myMap);

export {mainPinMarker,markerGroup};
