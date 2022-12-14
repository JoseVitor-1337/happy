import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import mapMarkerSVG from "../../assets/map-marker.svg";
import getMapIcon from "../../utils/getMapIcon";

import "./style.css";
import useOrphanages from "./hooks/useOrphanages";

export default function OrphanagesMap() {
  const { orphanages } = useOrphanages();

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerSVG} alt="Ponto do map" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Roraima</strong>
          <span>Boa Vista</span>
        </footer>
      </aside>

      <MapContainer
        center={[2.8337552, -60.7098284]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_API}`}
        />
        {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={getMapIcon()}
            position={[orphanage.latitude, orphanage.longitude]}
          >
            <Popup
              closeButton={false}
              minWidth={240}
              maxWidth={240}
              className="map-popup"
            >
              {orphanage.name}
              <Link to={`/orphanages/${orphanage.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <Link className="create-orphanage" to="/orphanages/create">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}
