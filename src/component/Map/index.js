import { useState, useContext } from "react";
import MapContext from "../../store/map-context";
import AddCable from "../Cable/AddCable";

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
import { ClientIcon, PopIcon, JunctionIcon, GponIcon } from "./MarkerIcons";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const drawOptions = {
  rectangle: false,
  circle: false,
  circlemarker: false,
  polygon: false,
  marker: false,
};

const NetworkMap = () => {
  console.log("map");
  const [center, setCenter] = useState({ lat: 23.8041, lng: 90.4152 });
  const [drawing, setDrawing] = useState(false);
  const [showAddCable, setShowAddCable] = useState(false);

  const context = useContext(MapContext);

  const handleCreated = (e) => {
    context.setCable(e.layer._latlngs);
    setShowAddCable(true);
  };

  return (
    <>
      <AddCable
        visible={showAddCable && context.cable !== null}
        hide={() => setShowAddCable(false)}
      />

      <MapContainer center={center} zoom={13}>
        {!drawing && <LocationMarker />}

        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            draw={drawOptions}
            onDrawStart={() => {
              setDrawing(true);
              context.setlatlang(null);
            }}
            onDrawStop={() => setDrawing(false)}
            edit={{ edit: false }}
          />
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {context.networkPoint?.pops.map((pop) => {
          return (
            <Marker
              icon={PopIcon}
              key={pop.identifier}
              position={[pop.latitude, pop.longitude]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
                click: (event) => {
                  console.log("clicked");
                },
              }}
            >
              <Popup>{pop.name}</Popup>
            </Marker>
          );
        })}
        {context.networkPoint?.clients.map((client) => {
          return (
            <Marker
              icon={ClientIcon}
              key={client.identifier}
              position={[client.latitude, client.longitude]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
                click: (event) => {
                  console.log("clicked");
                },
              }}
            >
              <Popup>{client.name}</Popup>
            </Marker>
          );
        })}
        {context.networkPoint?.junctions.map((junction) => {
          return (
            <Marker
              icon={JunctionIcon}
              key={junction.identifier}
              position={[junction.latitude, junction.longitude]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
                click: (event) => {
                  console.log("clicked");
                },
              }}
            >
              <Popup>{junction.name}</Popup>
            </Marker>
          );
        })}
        {context.networkPoint?.gpons.map((gpon) => {
          return (
            <Marker
              icon={GponIcon}
              key={gpon.identifier}
              position={[gpon.latitude, gpon.longitude]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
                click: (event) => {
                  console.log("clicked");
                },
              }}
            >
              <Popup>{gpon.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
};

export default NetworkMap;
