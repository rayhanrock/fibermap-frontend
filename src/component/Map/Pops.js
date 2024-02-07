import { useState, useMemo } from "react";
import { Popup, Marker } from "react-leaflet";
import { PopIcon } from "./MarkerIcons";
import PopModal from "../Modal/POP/PopModal";
import { useSelector } from "react-redux";
const Pops = () => {
  console.log("Pops iun mapp");
  const pops = useSelector((state) => state.map.pops);
  const [selectedPopId, setSelectedPopId] = useState(null);
  const [selectedPopType, setSelectedPopType] = useState("");
  const [showPopModal, setShowPopModal] = useState(false);

  const showPops = useMemo(
    () =>
      pops?.map((pop) => {
        return (
          <Marker
            icon={PopIcon}
            key={pop.identifier}
            position={[pop.latitude, pop.longitude]}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
              click: (event) => {
                setShowPopModal(true);
                setSelectedPopId(pop.id);
                setSelectedPopType(pop.pop_type);
              },
            }}
          >
            <Popup>{pop.name}</Popup>
          </Marker>
        );
      }),
    [pops]
  );
  return (
    <>
      {showPopModal && (
        <PopModal
          popId={selectedPopId}
          popType={selectedPopType}
          onClose={() => setShowPopModal(false)}
        />
      )}
      {showPops}
    </>
  );
};

export default Pops; //Pops;
