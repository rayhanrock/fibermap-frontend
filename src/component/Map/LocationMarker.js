import { useState } from "react";
import { Popup, Marker, useMapEvents } from "react-leaflet";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : (
    <Marker position={position}>{console.log(position)}</Marker>
  );
}

export default LocationMarker;
