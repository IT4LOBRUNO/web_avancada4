import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import "../components/Layout.css";
import logo from "../assets/logo.png";

export default function Layout({ children }) {
  const [userName, setUserName] = useState("");
  const [showCadastro, setShowCadastro] = useState(false);
  const [showBusca, setShowBusca] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Carrega nome do usuário
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

  // Mantém submenu aberto conforme rota atual
  useEffect(() => {
    if (
      location.pathname.includes("/cadastrar-aluno") ||
      location.pathname.includes("/cadastrar-responsavel")
    ) {
      setShowCadastro(true);
    } else {
      setShowCadastro(false);
    }

    if (
      location.pathname.includes("/buscar-aluno") ||
      location.pathname.includes("/buscar-responsavel")
    ) {
      setShowBusca(true);
    } else {
      setShowBusca(false);
    }
  }, [location.pathname]);

  return (
    <div className="home-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" />
          <div>
            <p>{userName}</p>
          </div>
        </div>

        <button className="menu-btn" onClick={() => navigate("/home")}>
          Início
        </button>

        {/* Aba Cadastro */}
        <button
          className="menu-btn"
          onClick={() => setShowCadastro(!showCadastro)}
        >
          <span className={`submenu-indicator ${showCadastro ? "open" : ""}`}>
            &gt;
          </span>
          Cadastro
        </button>
        {showCadastro && (
          <div className="submenu">
            <button className="submenu-btn" onClick={() => navigate("/cadastrar-aluno")}>
              Cadastro Aluno
            </button>
            <button className="submenu-btn" onClick={() => navigate("/cadastrar-responsavel")}>
              Cadastro Responsável
            </button>
          </div>
        )}

        {/* Aba Busca */}
        <button
          className="menu-btn"
          onClick={() => setShowBusca(!showBusca)}
        >
          <span className={`submenu-indicator ${showBusca ? "open" : ""}`}>
            &gt;
          </span>
          Busca
        </button>
        {showBusca && (
          <div className="submenu">
            <button className="submenu-btn" onClick={() => navigate("/buscar-aluno")}>
              Buscar Aluno
            </button>
            <button className="submenu-btn" onClick={() => navigate("/buscar-responsavel")}>
              Buscar Responsável
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
