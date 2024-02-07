import { useState, useMemo } from "react";
import { Popup, Marker } from "react-leaflet";
import { GponIcon } from "./MarkerIcons";
import GponModal from "../Modal/Gpon/GponModal";
import { useSelector } from "react-redux";
const Gpons = () => {
  console.log("Gpons iun mapp");
  const gpons = useSelector((state) => state.map.gpons);

  const [selectedGponId, setSelectedGponId] = useState(null);
  const [selectedGponType, setSelectedGponType] = useState("");
  const [showGponModal, setShowGponModal] = useState(false);

  const showGpons = useMemo(
    () =>
      gpons?.map((gpon) => {
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
                setSelectedGponType(gpon.name);
              },
            }}
          >
            <Popup>{gpon.name}</Popup>
          </Marker>
        );
      }),
    [gpons]
  );
  return (
    <>
      {showGponModal && (
        <GponModal
          gponId={selectedGponId}
          gponType={selectedGponType}
          onClose={() => setShowGponModal(false)}
        />
      )}
      {showGpons}
    </>
  );
};

export default Gpons;
