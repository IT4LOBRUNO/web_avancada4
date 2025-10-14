import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import "../components/Layout.css";
import logo from "../assets/logo.png";

export default function Layout({ children }) {
  const [userName, setUserName] = useState("");
  const [showResponsaveis, setShowResponsaveis] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserName(docSnap.data().nome);
        }
      } else {
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  useEffect(() => {
    if (location.pathname.startsWith("/buscar-") || location.pathname.startsWith("/cadastrar-")) {
      if (
        location.pathname.includes("responsavel") ||
        location.pathname.includes("aluno")
      ) {
        setShowResponsaveis(true);
      }
    }
  }, [location.pathname]);

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" />
          <div>
            <h2>Creche Estrela do Oriente</h2>
            <p>{userName}</p>
          </div>
        </div>

        <button className="menu-btn" onClick={() => navigate("/home")}>
          Início
        </button>

        {/* Submenu Ensino */}
        <button
          className="menu-btn"
          onClick={() => setShowResponsaveis(!showResponsaveis)}
        >
          <span className={`submenu-indicator ${showResponsaveis ? "open" : ""}`}>
            &gt;
          </span>
          Ensino
        </button>
        {showResponsaveis && (
          <div className="submenu">
            <button className="submenu-btn" onClick={() => navigate("/buscar-aluno")}>
              Buscar Aluno
            </button>
            <button className="submenu-btn" onClick={() => navigate("/cadastrar-aluno")}>
              Cadastrar Aluno
            </button>
            <button className="submenu-btn" onClick={() => navigate("/buscar-responsavel")}>
              Buscar Responsável
            </button>
            <button className="submenu-btn" onClick={() => navigate("/cadastrar-responsavel")}>
              Cadastrar Responsável
            </button>
          </div>
        )}

        <div className="sidebar-bottom">
          <button className="menu-btn-sair" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </aside>

      <main className="home-content">{children}</main>
    </div>
  );
}
