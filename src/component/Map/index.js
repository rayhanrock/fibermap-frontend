import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  FeatureGroup,
} from "react-leaflet";

import { EditControl } from "react-leaflet-draw";
import LocationMarker from "./LocationMarker";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./map.css";
import "leaflet-draw/dist/leaflet.draw.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const NetworkMap = () => {
  const [center, setCenter] = useState({ lat: 23.8041, lng: 90.4152 });
  const [drawing, setDrawing] = useState(false);

  const handleCreated = (e) => {
    console.log(e);
  };
  const drawOptions = {
    rectangle: false,
    circle: false,
    circlemarker: false,
    polygon: false,
    marker: false,
  };

  return (
    <MapContainer center={center} zoom={13}>
      {!drawing && <LocationMarker />}

      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={drawOptions}
          onDrawStart={() => setDrawing(true)}
          onDrawStop={() => setDrawing(false)}
          edit={{ edit: false }}
        />
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default NetworkMap;
