import "./style.css";

import { FiArrowRight } from "react-icons/fi";

import { Link } from "react-router-dom";

import LogoSVG from "../../assets/logo.svg";

export default function LandingPage() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={LogoSVG} alt="Logo Happy" />
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças</p>
        </main>

        <div className="location">
          <strong>Roraima</strong>
          <span>Boa Vista</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, .6)" />
        </Link>
      </div>
    </div>
  );
}
