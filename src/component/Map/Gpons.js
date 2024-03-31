import { useState, useMemo } from "react";
import { Popup, Marker, useMap } from "react-leaflet";
import { GponIcon } from "./MarkerIcons";
import GponModal from "../Modal/Gpon/GponModal";
import { useSelector } from "react-redux";
import { List, ListItem } from "semantic-ui-react";
const Gpons = () => {
  const gpons = useSelector((state) => state.map.gpons);
  const map = useMap();
  const [selectedGponId, setSelectedGponId] = useState(null);
  const [selectedGponType, setSelectedGponType] = useState("");
  const [showGponModal, setShowGponModal] = useState(false);

  const showGpons = useMemo(
    () =>
      gpons?.map((gpon) => {
        return (
          <Marker
            icon={GponIcon}
            key={gpon.id}
            position={[gpon.latitude, gpon.longitude]}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
              click: (event) => {
                setShowGponModal(true);
                map.flyTo([gpon.latitude, gpon.longitude]);
                setSelectedGponId(gpon.id);
                setSelectedGponType(gpon.name);
              },
            }}
          >
            <Popup>
              <List>
                <ListItem>
                  <b>ID:</b> {gpon.identifier}
                </ListItem>
                <ListItem>
                  <b>Type:</b> {gpon.name} (1X{gpon.splitter})
                </ListItem>
                <ListItem>
                  <b>Address:</b> {gpon.address}
                </ListItem>
              </List>
            </Popup>
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
