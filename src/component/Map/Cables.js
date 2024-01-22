import { memo } from "react";
import { Popup, Polyline } from "react-leaflet";
import { useSelector } from "react-redux";
const Cables = () => {
  const cables = useSelector((state) => state.map.cables);
  return (
    <>
      {cables?.map((cable) => (
        <Polyline
          key={cable.identifier}
          pathOptions={{ color: "green", weight: 6 }}
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
