import React, { useState, useEffect } from "react";
import Layout from "../components/Layout.jsx";
import Button from "../components/Button.jsx";
import SearchTable from "../components/SearchTable.jsx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig.js";
import { useNavigate } from "react-router-dom";

export default function AlunoBuscar() {
  const [busca, setBusca] = useState("");
  const [alunos, setAlunos] = useState([]);
  const [resultado, setResultado] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarAlunos = async () => {
      const snapshot = await getDocs(collection(db, "alunos"));
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlunos(lista);
    };
    carregarAlunos();
  }, []);

  const handleBuscar = () => {
    const termo = busca.toLowerCase();
    const filtrados = alunos.filter((a) =>
      a.alunoData?.nome?.toLowerCase().includes(termo)
    );
    setResultado(filtrados);
  };

  const handlePerfil = (alunoId) => {
    navigate(`/aluno-perfil/${alunoId}`);
  };

  const formatarData = (dataStr) => {
    if (!dataStr) return "—";
    const partes = dataStr.split("-");
    if (partes.length === 3) {
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`;
    }
    return dataStr;
  };

  return (
    <Layout>
      <h1 style={{ marginBottom: "20px" }}>Buscar Aluno</h1>

      <div style={{ display: "flex", marginBottom: "20px", gap: "10px" }}>
        <input
          type="text"
          placeholder="Digite o nome do aluno"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />
        <Button onClick={handleBuscar}>Buscar</Button>
      </div>

      <SearchTable
        headers={["Nome", "CPF", "Data de Nascimento", "Responsável", "Ações"]}
        rows={resultado.map((aluno) => ({
          id: aluno.id,
          nome: aluno.alunoData?.nome || "—",
          cpf: aluno.documentos?.cpf || "—",
          nascimento: formatarData(aluno.alunoData?.dataNascimento),
          responsavel: aluno.responsavelNome || "—",
        }))}
        onActionClick={(id) => handlePerfil(id)}
        actionLabel="Perfil"
      />
    </Layout>
  );
}
