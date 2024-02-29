import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  updatePops,
  updateClients,
  updateTJBoxs,
  updateGpons,
  updateCables,
  updateResellers,
} from "../../store/map/actions";
import AddCable from "../Cable/AddCable";
import Draw from "./Draw";

import Cables from "./Cables";
import Pops from "./Pops";
import TJBoxs from "./TJBoxs";
import Clients from "./Clients";
import Gpons from "./Gpons";
import HighlightPath from "./HighlightPath";

import { MapContainer, TileLayer, LayersControl } from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./map.css";
import "leaflet-draw/dist/leaflet.draw.css";
import CableColorInfo from "./CableColorInfo";
import { useMapContext } from "../../contexts/map-context";
import ModelFinderMarker from "./ModelFinderMarker";
import SearchLocation from "./SearchLocation";
import Resellers from "./Resellers";
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
  const { BaseLayer } = LayersControl;
  const [center, setCenter] = useState({ lat: 22.8724, lng: 91.0973 });
  const { setMap } = useMapContext();
  const dispatch = useDispatch();
  const drawLine = useSelector((state) => state.map.drawLine);

  useEffect(() => {
    dispatch(updatePops());
    dispatch(updateClients());
    dispatch(updateTJBoxs());
    dispatch(updateGpons());
    dispatch(updateCables());
    dispatch(updateResellers());
  }, [dispatch]);

  return (
    <>
      <AddCable visible={drawLine !== null} />

      <MapContainer center={center} zoom={13} ref={setMap}>
        <LayersControl position="topright">
          <BaseLayer checked name="Satellite View">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </BaseLayer>
          <BaseLayer name="Street View">
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </BaseLayer>
        </LayersControl>

        <CableColorInfo />
        <ModelFinderMarker />
        <Draw />
        <Pops />
        <Clients />
        <TJBoxs />
        <Resellers />
        {/* <Gpons /> */}
        <Cables />
        <HighlightPath />
        <SearchLocation />
      </MapContainer>
    </>
  );
};

export default NetworkMap;
