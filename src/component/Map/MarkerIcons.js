import { Icon } from "leaflet";
import houseIcon from "../../assets/icons/house.png";
import popIcon from "../../assets/icons/office.png";
import junctionIcon from "../../assets/icons/junction.png";
import gponIcon from "../../assets/icons/gpon.png";

export const PopIcon = new Icon({
  iconUrl: popIcon,
  iconSize: [28, 28],
});

export const ClientIcon = new Icon({
  iconUrl: houseIcon,
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
