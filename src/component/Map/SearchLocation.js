import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import { useDispatch } from "react-redux";
import { mapActions } from "../../store/map/reducer";

import "leaflet-geosearch/dist/geosearch.css";

const SearchLocation = () => {
  const dispatch = useDispatch();

  const map = useMap();
  const handleSearchResults = (data) => {
    if (data.location) {
      dispatch(
        mapActions.updateLatLang({ lat: data.location.y, lng: data.location.x })
      );
    }
  };
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      notFoundMessage: "Location not found",
      showMarker: false,
    });

    map.addControl(searchControl);
    map.on("geosearch/showlocation", handleSearchResults);

    return () => map.removeControl(searchControl);
  }, []);

  return null;
};

export default SearchLocation;
