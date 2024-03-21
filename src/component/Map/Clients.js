import { useState, useMemo } from "react";
import { Popup, Marker, useMap } from "react-leaflet";
import { ClientIcon } from "./MarkerIcons";
import ClientModal from "../Modal/Client/ClientModal";
import { useSelector } from "react-redux";
import { Header, List, ListItem } from "semantic-ui-react";
const Clients = () => {
  console.log("Clients iun mapp");
  const clients = useSelector((state) => state.map.clients);
  const map = useMap();
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const showClients = useMemo(
    () =>
      clients?.map((client) => {
        return (
          <div
          // style={{
          //   padding: "5rem",
          //   backgroundColor: "green",
          //   width: "1rem",
          //   height: "1rem",
          // }}
          //   key={client.id}
          //   onMouseOver={() => {
          //     alert(client.id);
          //   }}
          >
            <Marker
              icon={ClientIcon}
              key={client.id}
              position={[client.latitude, client.longitude]}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
                click: (event) => {
                  map.flyTo([client.latitude, client.longitude]);
                  setShowClientModal(true);
                  setSelectedClientId(client.id);
                },
              }}
            >
              <Popup>
                <List>
                  <ListItem>
                    <b>ID:</b> {client.identifier}
                  </ListItem>
                  <ListItem>
                    <b>Name:</b> {client.name}
                  </ListItem>
                  <ListItem>
                    <b>Address:</b> {client.address}
                  </ListItem>
                </List>
              </Popup>
            </Marker>
          </div>
        );
      }),
    [clients]
  );
  return (
    <>
      {showClientModal && (
        <ClientModal
          clientId={selectedClientId}
          onClose={() => setShowClientModal(false)}
        />
      )}
      {showClients}
    </>
  );
};

export default Clients;
