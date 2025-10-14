import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Layout from "../components/Layout.jsx";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import ResponsavelCard from "../components/ResponsavelCard.jsx";
import Button from "../components/Button.jsx";
import "../components/Components.css";

export default function AlunoCadastrar() {
  const [busca, setBusca] = useState("");
  const [responsaveis, setResponsaveis] = useState([]);
  const navigate = useNavigate();

  const handleBuscar = async () => {
    if (!busca.trim()) return;

    const responsaveisRef = collection(db, "responsaveis");
    const q = query(
      responsaveisRef,
      where("nome", ">=", busca),
      where("nome", "<=", busca + "\uf8ff")
    );
    const snapshot = await getDocs(q);
    const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setResponsaveis(lista);
  };

  return (
    <Layout>
      <h2>Buscar Responsável para Associar ao Aluno</h2>

      <SearchBar
        placeholder="Digite o nome do responsável"
        value={busca}
        onChange={setBusca}
      />

      <Button onClick={handleBuscar} style={{ marginTop: 8 }}>
        Buscar
      </Button>

      <div className="resultados-container" style={{ marginTop: 16 }}>
        {responsaveis.map((r) => (
          <ResponsavelCard
            key={r.id}
            responsavel={r}
            onCadastrar={() => navigate(`/cadastrar-aluno/${r.id}`)}
          />
        ))}
      </div>
    </Layout>
  );
}
