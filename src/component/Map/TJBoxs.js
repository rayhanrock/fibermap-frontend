import { useState, useMemo } from "react";
import { Popup, Marker } from "react-leaflet";
import { TJBoxIcon } from "./MarkerIcons";
import TJBoxModal from "../Modal/TJBox/TJBoxModal";
import { useSelector } from "react-redux";
import { List, ListItem } from "semantic-ui-react";
const TJBoxs = () => {
  const tjboxs = useSelector((state) => state.map.tjboxs);
  const [selectedTJBoxId, setSelectedTJBoxId] = useState(null);
  const [showTJBoxModal, setShowTJBoxModal] = useState(false);

  const showTJBoxs = useMemo(
    () =>
      tjboxs?.map((tjbox) => {
        return (
          <Marker
            icon={TJBoxIcon}
            key={tjbox.identifier}
            position={[tjbox.latitude, tjbox.longitude]}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
              click: (event) => {
                setShowTJBoxModal(true);
                setSelectedTJBoxId(tjbox.id);
              },
            }}
          >
            <Popup>
              <List>
                <ListItem>
                  <b>ID:</b> {tjbox.identifier}
                </ListItem>
                <ListItem>
                  <b>Name:</b> {tjbox.name}
                </ListItem>
                <ListItem>
                  <b>Address:</b> {tjbox.address}
                </ListItem>
              </List>
            </Popup>
          </Marker>
        );
      }),
    [tjboxs]
  );
  return (
    <>
      {showTJBoxModal && (
        <TJBoxModal
          tjboxId={selectedTJBoxId}
          onClose={() => setShowTJBoxModal(false)}
        />
      )}
      {showTJBoxs}
    </>
  );
};

export default TJBoxs;
