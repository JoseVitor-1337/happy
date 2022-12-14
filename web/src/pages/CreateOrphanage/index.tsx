import { FiPlus } from "react-icons/fi";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

import { Sidebar } from "../../components";
import getMapIcon from "../../utils/getMapIcon";

import "./style.css";

export default function CreateOrphanage() {
  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[2.8337552, -60.7098284]}
              zoom={15}
              style={{ width: "100%", height: 200 }}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_API}`}
              />

              <Marker
                interactive={false}
                icon={getMapIcon()}
                position={[2.8337552, -60.7098284]}
              />
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input type="text" name="name" id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caractéres</span>
              </label>
              <textarea name="about" id="about" />
            </div>

            <div className="input-block images-container">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image"></div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6D6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea name="instructions" id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de atendimento</label>
              <input type="text" name="opening_hours" id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekands">Atende fim de semana?</label>

              <div className="button-select">
                <button type="button" className="active">
                  Sim
                </button>
                <button type="button">Não</button>
              </div>
            </div>
          </fieldset>

          <button type="submit" className="confirm-button">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
