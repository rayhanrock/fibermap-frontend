import { memo } from "react";
import { Popup, Polyline } from "react-leaflet";
import { useSelector } from "react-redux";
import { List, ListItem } from "semantic-ui-react";

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
  return (
    <>
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
              console.log("clicked cable");
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
