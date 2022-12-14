import Leaflet from "leaflet";

import mapMarkerSVG from "../assets/map-marker.svg";

function getMapIcon() {
  const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerSVG,
    iconSize: [30, 30],
    popupAnchor: [0, -20],
  });

  return mapIcon;
}

export default getMapIcon;
