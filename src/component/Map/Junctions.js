import { useState, useMemo } from "react";
import { Popup, Marker } from "react-leaflet";
import { JunctionIcon } from "./MarkerIcons";
import JunctionModal from "../Modal/Junction/JunctionModal";
import { useSelector } from "react-redux";
const Junctions = () => {
  console.log("Junctions iun mapp");
  const junctions = useSelector((state) => state.map.junctions);
  const [selectedJunctionId, setSelectedJunctionId] = useState(null);
  const [showJunctionModal, setShowJunctionModal] = useState(false);

  const showJunctions = useMemo(
    () =>
      junctions?.map((junction) => {
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
      }),
    [junctions]
  );
  return (
    <>
      {showJunctionModal && (
        <JunctionModal
          junctionId={selectedJunctionId}
          onClose={() => setShowJunctionModal(false)}
        />
      )}
      {showJunctions}
    </>
  );
};

export default Junctions;
