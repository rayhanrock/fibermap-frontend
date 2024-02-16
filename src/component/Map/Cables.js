import { memo, useState } from "react";
import { Popup, Polyline } from "react-leaflet";
import { useSelector } from "react-redux";
import { List, ListItem } from "semantic-ui-react";
import CableModal from "../Modal/Cable/CableModal";
const coreColorMap = {
  2: "#0000FF", //blue
  4: "#FF0000", //red
  8: "#000000", //black
  12: "#800080", //purple
  24: "#FFA500", //orange
  36: "#FFFF00", //yellow
};

const Cables = () => {
  const cables = useSelector((state) => state.map.cables);
  const [showCableModal, setShowCableModal] = useState(false);
  const [selectedCableId, setSelectedCableId] = useState(null);

  return (
    <>
      {showCableModal && (
        <CableModal
          cableId={selectedCableId}
          onClose={() => setShowCableModal(false)}
        />
      )}
      {cables?.map((cable) => (
        <Polyline
          key={cable.id}
          pathOptions={{
            // color: coreColorMap[cable.number_of_cores],
            weight: 6,
            color: "green",
          }}
          positions={cable.polyline}
          eventHandlers={{
            mouseover: (event) => event.target.openPopup(),
            mouseout: (event) => event.target.closePopup(),
            click: (event) => {
              setShowCableModal(true);
              setSelectedCableId(cable.id);
            },
          }}
        >
          {console.log("rendering...")}
          <Popup>
            <List>
              <ListItem>
                <b>ID:</b> {cable.identifier}
              </ListItem>
              <ListItem>
                <b>Core:</b> {cable.number_of_cores}
              </ListItem>
              <ListItem>
                <b>Type:</b> {cable.type}
              </ListItem>
              <ListItem>
                <b>Length:</b> {cable.length} (meter)
              </ListItem>
            </List>
          </Popup>
        </Polyline>
      ))}
    </>
  );
};

export default memo(Cables);
