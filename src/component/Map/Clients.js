import { useState, useMemo } from "react";
import { Popup, Marker } from "react-leaflet";
import { ClientIcon } from "./MarkerIcons";
import ClientModal from "../Modal/Client/ClientModal";
import { useSelector } from "react-redux";
const Clients = () => {
  console.log("Clients iun mapp");
  const clients = useSelector((state) => state.map.clients);

  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);
  const showClients = useMemo(
    () =>
      clients?.map((client) => {
        return (
          <Marker
            icon={ClientIcon}
            key={client.identifier}
            position={[client.latitude, client.longitude]}
            eventHandlers={{
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
              click: (event) => {
                setShowClientModal(true);
                setSelectedClientId(client.id);
              },
            }}
          >
            <Popup>{client.name}</Popup>
          </Marker>
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
