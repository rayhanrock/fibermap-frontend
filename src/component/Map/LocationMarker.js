import { useState, useContext } from "react";
import { Popup, Marker, useMapEvents } from "react-leaflet";
import MapContext from "../../store/map-context";
function LocationMarker() {
  const context = useContext(MapContext);

  useMapEvents({
    click(e) {
      context.setlatlang(e.latlng);
    },
  });
  return context.latlang === null ? null : (
    <Marker position={context.latlang}></Marker>
  );
}

export default LocationMarker;
