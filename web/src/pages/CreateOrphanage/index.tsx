import { FormEvent, ChangeEvent, useMemo, useState, useCallback } from "react";
import { FiPlus } from "react-icons/fi";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import { LeafletMouseEvent } from "leaflet";

import { Sidebar, Textarea, Input } from "../../components";
import getMapIcon from "../../utils/getMapIcon";
import useMapOnClick from "./hooks/useMapOnClick";
import useGetUserInitialCoordinates from "./hooks/useGetUserInitialCoordinates";
import api from "../../services/api";

import "./style.css";

type ICoordinates = {
  latitude: number;
  longitude: number;
};

export default function CreateOrphanage() {
  const navigate = useNavigate();

  const [openOnWeekands, setOpenOnWeekands] = useState<boolean>(true);
  const [coordinates, setCoordinates] = useState<ICoordinates>();
  const [images, setImages] = useState<File[]>([]);
  const [formValues, setFormValues] = useState({
    name: "",
    about: "",
    instructions: "",
    opening_hours: "",
  });

  const previewImaes = useMemo(() => {
    return images.map((image) => {
      return URL.createObjectURL(image);
    });
  }, [images]);

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function onChangeTextarea(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function handleSetCoordinates(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;

    setCoordinates({ latitude: lat, longitude: lng });
  }

  function handleonChangeInputFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const newImages = Array.from(event.target.files);

    setImages((oldImages) => {
      return [...newImages, ...oldImages];
    });
  }

  const getInitialPosition = useCallback(
    (latitude: number, longitude: number) => {
      setCoordinates({ latitude, longitude });
    },
    []
  );

  const { setMapRef } = useMapOnClick(handleSetCoordinates);
  useGetUserInitialCoordinates(getInitialPosition);

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    const orphanage = {
      ...formValues,
      ...coordinates,
      open_on_weekands: openOnWeekands,
    };

    Object.entries(orphanage).forEach(([key, value]) => {
      data.append(key, value as string);
    });

    images.forEach((image) => {
      data.append("images", image);
    });

    await api.post("orphanages", data);

    alert("Cadastro realizado com sucesso!");

    navigate("/orphanages");
  }

  if (!coordinates) return null;

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleOnSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              ref={(ref) => setMapRef(ref)}
              center={[coordinates.latitude, coordinates.longitude]}
              zoom={15}
              style={{ width: "100%", height: 200 }}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_API}`}
              />

              {coordinates.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={getMapIcon()}
                  position={[coordinates.latitude, coordinates.longitude]}
                />
              )}
            </MapContainer>

            <Input
              label="Nome"
              name="name"
              id="name"
              value={formValues.name}
              onChange={onChangeInput}
            />

            <Textarea
              label="Sobre"
              name="about"
              id="about"
              value={formValues.about}
              onChange={onChangeTextarea}
            />

            <div className="input-block images-container">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImaes.map((preview) => (
                  <img key={preview} src={preview} alt="Preview da imagem" />
                ))}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6D6" />
                </label>

                <input
                  multiple
                  type="file"
                  name="image"
                  id="image[]"
                  onChange={handleonChangeInputFile}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <Textarea
              label="Instruções"
              name="instructions"
              id="instructions"
              value={formValues.instructions}
              onChange={onChangeTextarea}
            />

            <Input
              label="Horário de atendimento"
              type="text"
              name="opening_hours"
              id="opening_hours"
              value={formValues.opening_hours}
              onChange={onChangeInput}
            />

            <div className="input-block">
              <label htmlFor="open_on_weekands">Atende fim de semana?</label>

              <div className="button-select">
                <button
                  type="button"
                  className={openOnWeekands ? "active" : ""}
                  onClick={() => setOpenOnWeekands(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!openOnWeekands ? "active" : ""}
                  onClick={() => setOpenOnWeekands(false)}
                >
                  Não
                </button>
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
