import { useState, useEffect } from "react";
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
  console.log("map");
  const [center, setCenter] = useState({ lat: 23.8041, lng: 90.4152 });

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

      <MapContainer center={center} zoom={13}>
        <CableColorInfo />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Draw />
        <Pops />
        <Clients />
        <Junctions />
        <Gpons />
        <Cables />
        <HighlightPath />
      </MapContainer>
    </>
  );
};

export default NetworkMap;
