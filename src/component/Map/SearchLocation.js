import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { EsriProvider, GeoSearchControl } from "leaflet-geosearch";
import { useDispatch } from "react-redux";
import { mapActions } from "../../store/map/reducer";

import "leaflet-geosearch/dist/geosearch.css";

const SearchLocation = () => {
  const dispatch = useDispatch();

  const map = useMap();
  const handleSearchResults = (data) => {
    console.log(data);
    if (data.location) {
      dispatch(
        mapActions.updateLatLang({ lat: data.location.y, lng: data.location.x })
      );
    }
  };
  useEffect(() => {
    // dispatch(
    //   mapActions.updateLatLang({
    //     lat: `22°53'24.1"N`,
    //     lng: `91°00'24.7"E
    // `,
    //   })
    // );
    const provider = new EsriProvider();

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
