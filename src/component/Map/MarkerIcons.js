import { Icon } from "leaflet";
import peopleIcon from "../../assets/icons/user.png";
import popIcon from "../../assets/icons/office.png";
import junctionIcon from "../../assets/icons/junction.png";
import gponIcon from "../../assets/icons/gpon.png";
import locationIcon from "../../assets/icons/location.png";

export const PopIcon = new Icon({
  iconUrl: popIcon,
  iconSize: [28, 28],
});

export const ClientIcon = new Icon({
  iconUrl: peopleIcon,
  iconSize: [28, 28],
});

export const JunctionIcon = new Icon({
  iconUrl: junctionIcon,
  iconSize: [28, 28],
});

export const GponIcon = new Icon({
  iconUrl: gponIcon,
  iconSize: [28, 28],
});

export const RedMarkerIcon = new Icon({
  iconUrl: locationIcon,
  iconSize: [30, 30],
  iconAnchor: [15, 28],
});
