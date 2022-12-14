import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import { Sidebar } from "../../components";
import getMapIcon from "../../utils/getMapIcon";
import useOrphanage from "./hooks/useOrphanage";

import "./style.css";

export default function Orphanage() {
  const [selectedMainUrl, setSelectedMainUrl] = useState("");
  const { orphanage } = useOrphanage();

  function handleSelectedMainUrl(url: string) {
    setSelectedMainUrl(url);
  }

  useEffect(() => {
    if (orphanage) {
      setSelectedMainUrl(orphanage.images[0].url || "");
    }
  }, [orphanage]);

  if (!orphanage) return null;

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={selectedMainUrl} alt="Imagem do orfanato" />

          <div className="images">
            {orphanage.images.map(({ id, url }) => (
              <button
                key={id}
                className={selectedMainUrl === url ? "active" : ""}
                type="button"
                onClick={() => handleSelectedMainUrl(url)}
              >
                <img src={url} alt={orphanage.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <MapContainer
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: "100%", height: 200 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_API}`}
                />

                <Marker
                  interactive={false}
                  icon={getMapIcon()}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </MapContainer>

              <footer>
                <a
                  target="_blank"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                  rel="noreferrer"
                >
                  Ver rotos no Google maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções de visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda á sexta <br />
                {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekands ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39cc83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
