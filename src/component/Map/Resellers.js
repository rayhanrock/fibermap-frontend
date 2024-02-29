import { useState, useMemo } from "react";
import { Popup, Marker, useMap } from "react-leaflet";
import { ResellerIcon } from "./MarkerIcons";
import { useSelector } from "react-redux";
import { List, ListItem } from "semantic-ui-react";
import ResellerModal from "../Modal/Reseller/ResellerModal";
const Resellers = () => {
  console.log("Resellers iun mapp");
  const resellers = useSelector((state) => state.map.resellers);
  const map = useMap();
  const [showResellerModal, setShowResellerModal] = useState(false);
  const [selectedResellerId, setSelectedResellerId] = useState(null);
  const showResellers = useMemo(
    () =>
      resellers?.map((reseller) => {
        return (
          <Marker
            icon={ResellerIcon}
            key={reseller.id}
            position={[reseller.latitude, reseller.longitude]}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
              click: (event) => {
                map.flyTo([reseller.latitude, reseller.longitude]);
                setShowResellerModal(true);
                setSelectedResellerId(reseller.id);
              },
            }}
          >
            <Popup>
              <List>
                <ListItem>
                  <b>ID:</b> {reseller.identifier}
                </ListItem>
                <ListItem>
                  <b>Name:</b> {reseller.name}
                </ListItem>
                <ListItem>
                  <b>Address:</b> {reseller.address}
                </ListItem>
              </List>
            </Popup>
          </Marker>
        );
      }),
    [resellers]
  );
  return (
    <>
      {showResellerModal && (
        <ResellerModal
          resellerId={selectedResellerId}
          onClose={() => setShowResellerModal(false)}
        />
      )}
      {showResellers}
    </>
  );
};

export default Resellers;
