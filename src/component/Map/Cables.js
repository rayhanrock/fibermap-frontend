import { memo } from "react";
import { Popup, Polyline } from "react-leaflet";
import { useSelector } from "react-redux";

const coreColorMap = {
  2: "#0000FF", //blue
  4: "#FF0000", //red
  8: "#000000", //black
  12: "#800080", //purple
  24: "#FFA500", //orange
  36: "#FFFF00", //yellow
  48: "#008000", //green
};

const Cables = () => {
  const cables = useSelector((state) => state.map.cables);
  return (
    <>
      {cables?.map((cable) => (
        <Polyline
          key={cable.identifier}
          pathOptions={{
            // color: coreColorMap[cable.number_of_cores],
            weight: 6,
            color: "green",
          }}
          positions={cable.polyline}
        >
          {console.log("rendering...")}
          <Popup>{cable.identifier}</Popup>
        </Polyline>
      ))}
    </>
  );
};

export default memo(Cables);
