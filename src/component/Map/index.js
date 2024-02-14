import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/map/reducer";

import {
  updatePops,
  updateClients,
  updateJunctions,
  updateGpons,
  updateCables,
} from "../../store/map/actions";
import AddCable from "../Cable/AddCable";
import Draw from "./Draw";

import Cables from "./Cables";
import Pops from "./Pops";
import Junctions from "./Junctions";
import Clients from "./Clients";
import Gpons from "./Gpons";
import HighlightPath from "./HighlightPath";

import { MapContainer, TileLayer } from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./map.css";
import "leaflet-draw/dist/leaflet.draw.css";
import CableColorInfo from "./CableColorInfo";
import { useMapContext } from "../../contexts/map-context";
import ModelFinderMarker from "./ModelFinderMarker";
import SearchLocation from "./SearchLocation";
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
  const [center, setCenter] = useState({ lat: 22.8724, lng: 91.0973 });
  const { setMap } = useMapContext();
  const dispatch = useDispatch();
  const drawLine = useSelector((state) => state.map.drawLine);

  useEffect(() => {
    dispatch(updatePops());
    dispatch(updateClients());
    dispatch(updateJunctions());
    dispatch(updateGpons());
    dispatch(updateCables());
  }, [dispatch]);

  return (
    <>
      <AddCable visible={drawLine !== null} />

      <MapContainer center={center} zoom={13} ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        /> */}
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        /> */}
        <CableColorInfo />
        <ModelFinderMarker />
        <Draw />
        <Pops />
        <Clients />
        {/* <Junctions /> */}
        <Gpons />
        <Cables />
        <HighlightPath />
        <SearchLocation />
      </MapContainer>
    </>
  );
};

export default NetworkMap;
