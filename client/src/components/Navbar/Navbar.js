import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

import CustomButton from "../CustomButton/CustomButton";

import "./Navbar.css";

import cloudPng from "../../assets/cloud.png";
import logo from "../../assets/9oktas-logo.png";

export default function Navbar() {
  const { logout, error, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="navbar">
      <h3>9OKTAS _ </h3>
      <div className="route-links-wrapper">
        <div className="route-links-inner">
          <div className="route">
            <img width="35px" height="35px" alt="9oktas" src={cloudPng} />
            <p>Bulut</p>
          </div>
          <div className="route">
            <img width="35px" height="35px" alt="9oktas" src={cloudPng} />
            <p>Favoriler</p>
          </div>
          <div className="route">
            <img
              width="35px"
              height="35px"
              alt="9oktas"
              src={cloudPng}
              style={{ visibility: "hidden" }}
            />
            <p>Trash Can</p>
          </div>
        </div>
      </div>
      <div className="help-links-wrapper">
        <div className="help-links-inner">
          <div className="route">
            <img
              width="35px"
              height="35px"
              alt="9oktas"
              src={cloudPng}
              style={{ visibility: "hidden" }}
            />
            <p>Yardım</p>
          </div>
          <div className="route">
            <img
              width="35px"
              height="35px"
              alt="9oktas"
              src={cloudPng}
              style={{ visibility: "hidden" }}
            />
            <p>Problem Bildir</p>
          </div>
          <div className="route">
            <img
              width="35px"
              height="35px"
              alt="9oktas"
              src={cloudPng}
              style={{ visibility: "hidden" }}
            />
            <button
              disabled={isPending && true}
              className="cikis"
              onClick={logout}
            >
              {isPending ? "yükleniyor..." : "Çıkış"}
            </button>
          </div>
        </div>
      </div>
      <div className="logo-wrapper">
        <img width="40px" height="40px" src={logo} alt="9oktas" />
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}
