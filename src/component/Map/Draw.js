import { useState } from "react";
import { mapActions } from "../../store/map/reducer";
import { useDispatch } from "react-redux";

import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import LocationMarker from "./LocationMarker";

const drawOptions = {
  rectangle: false,
  circle: false,
  circlemarker: false,
  polygon: false,
  marker: false,
};
const Draw = () => {
  console.log("Draw");
  const dispatch = useDispatch();

  const [drawing, setDrawing] = useState(false);

  const handleCreated = (e) => {
    const parsed = e.layer._latlngs.map((latlng) => {
      return {
        lat: latlng.lat,
        lng: latlng.lng,
      };
    });
    dispatch(mapActions.setDrawLine(parsed));
  };

  return (
    <>
      <FeatureGroup>
        <EditControl
          position="topright"
          onCreated={handleCreated}
          draw={drawOptions}
          onDrawStart={() => {
            setDrawing(true);
            dispatch(mapActions.updateLatLang(null));
          }}
          onDrawStop={() => setDrawing(false)}
          edit={{ edit: false }}
        />
      </FeatureGroup>
      {!drawing && <LocationMarker />}
    </>
  );
};

export default Draw;
