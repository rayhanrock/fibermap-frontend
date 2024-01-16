import { useState, useContext } from "react";
import MapContext from "../../store/map-context";
import AddCable from "../Cable/AddCable";
import ClientModal from "../Modal/Client/ClientModal";
import JunctionModal from "../Modal/Junction/JunctionModal";
import PopModal from "../Modal/POP/PopModal";

import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  FeatureGroup,
  Polyline,
} from "react-leaflet";

import { EditControl } from "react-leaflet-draw";
import LocationMarker from "./LocationMarker";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./map.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { ClientIcon, PopIcon, JunctionIcon, GponIcon } from "./MarkerIcons";
import GponModal from "../Modal/Gpon/GponModal";

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

  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const [selectedJunctionId, setSelectedJunctionId] = useState(null);
  const [showJunctionModal, setShowJunctionModal] = useState(false);

  const [selectedPopId, setSelectedPopId] = useState(null);
  const [showPopModal, setShowPopModal] = useState(false);

  const [selectedGponId, setSelectedGponId] = useState(null);
  const [showGponModal, setShowGponModal] = useState(false);
  const {
    clients,
    pops,
    drawLine,
    setDrawLine,
    setlatlang,
    junctions,
    gpons,
    cables,
  } = useContext(MapContext);

  const handleCreated = (e) => {
    setDrawLine(e.layer._latlngs);
    setShowAddCable(true);
  };

  return (
    <>
      <AddCable
        visible={showAddCable && drawLine !== null}
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
              setlatlang(null);
            }}
            onDrawStop={() => setDrawing(false)}
            edit={{ edit: false }}
          />
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pops?.map((pop) => {
          return (
            <Marker
              icon={PopIcon}
              key={pop.identifier}
              position={[pop.latitude, pop.longitude]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
                click: (event) => {
                  setShowPopModal(true);
                  setSelectedPopId(pop.id);
                },
              }}
            >
              <Popup>{pop.name}</Popup>
            </Marker>
          );
        })}
        {showPopModal && (
          <PopModal
            popId={selectedPopId}
            onClose={() => setShowPopModal(false)}
          />
        )}
        {clients?.map((client) => {
          return (
            <Marker
              icon={ClientIcon}
              key={client.identifier}
              position={[client.latitude, client.longitude]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
                click: (event) => {
                  setShowClientModal(true);
                  setSelectedClientId(client.id);
                },
              }}
            >
              <Popup>{client.name}</Popup>
            </Marker>
          );
        })}
        {showClientModal && (
          <ClientModal
            clientId={selectedClientId}
            onClose={() => setShowClientModal(false)}
          />
        )}
        {junctions?.map((junction) => {
          return (
            <Marker
              icon={JunctionIcon}
              key={junction.identifier}
              position={[junction.latitude, junction.longitude]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
                click: (event) => {
                  setShowJunctionModal(true);
                  setSelectedJunctionId(junction.id);
                },
              }}
            >
              <Popup>{junction.name}</Popup>
            </Marker>
          );
        })}
        {showJunctionModal && (
          <JunctionModal
            junctionId={selectedJunctionId}
            onClose={() => setShowJunctionModal(false)}
          />
        )}
        {gpons?.map((gpon) => {
          return (
            <Marker
              icon={GponIcon}
              key={gpon.identifier}
              position={[gpon.latitude, gpon.longitude]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
                click: (event) => {
                  setShowGponModal(true);
                  setSelectedGponId(gpon.id);
                },
              }}
            >
              <Popup>{gpon.name}</Popup>
            </Marker>
          );
        })}
        {showGponModal && (
          <GponModal
            gponId={selectedGponId}
            onClose={() => setShowGponModal(false)}
          />
        )}
        {cables?.map((cable) => (
          <Polyline
            key={cable.identifier}
            pathOptions={{ color: "green", weight: 6 }}
            positions={cable.polyline}
          >
            <Popup>{cable.identifier}</Popup>
          </Polyline>
        ))}
      </MapContainer>
    </>
  );
};

export default NetworkMap;
