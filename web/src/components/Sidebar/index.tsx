import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import mapMarkerSVG from "../../assets/map-marker.svg";

import "./style.css";

export function Sidebar() {
  const navigate = useNavigate();

  function handleGoBack() {
    navigate("/");
  }

  return (
    <aside>
      <img src={mapMarkerSVG} alt="Happy" />

      <footer>
        <button type="button" onClick={handleGoBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
