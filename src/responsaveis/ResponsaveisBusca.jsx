import React, { useState } from "react";
import Layout from "../components/Layout";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import SearchBar from "../components/SearchBar";
import ResponsavelCard from "../components/ResponsavelCard";
import Button from "../components/Button";
import "../components/Components.css";

export default function ResponsaveisBusca() {
  const [busca, setBusca] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    if (!busca.trim()) return alert("Digite nome ou CPF");

    try {
      const qNome = query(
        collection(db, "responsaveis"),
        where("nome", ">=", busca),
        where("nome", "<=", busca + "\uf8ff")
      );
      const qCpf = query(
        collection(db, "responsaveis"),
        where("cpf", "==", busca)
      );

      const [snapshotNome, snapshotCpf] = await Promise.all([getDocs(qNome), getDocs(qCpf)]);

      const lista = [
        ...snapshotNome.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        ...snapshotCpf.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      ];

      const unicos = Array.from(new Map(lista.map((r) => [r.id, r])).values());
      setResultados(unicos);
    } catch (error) {
      alert("Erro ao buscar responsáveis: " + error.message);
    }
  };

  const downloadFile = (base64, filename) => {
    if (!base64) return alert("Arquivo não disponível");
    const link = document.createElement("a");
    link.href = base64;
    link.download = filename;
    link.click();
  };

  return (
    <Layout>
      <h1>Buscar Responsável</h1>

      <SearchBar placeholder="Digite nome ou CPF" value={busca} onChange={setBusca} />

      <div style={{ marginTop: 12 }}>
        <Button onClick={handleBuscar}>Buscar</Button>
      </div>

      {resultados.length > 0 && (
        <div className="resultados-container" style={{ marginTop: 16 }}>
          {resultados.map((resp) => (
            <ResponsavelCard
              key={resp.id}
              responsavel={resp}
              onDownloadComprovante={() => downloadFile(resp.comprovante, "comprovante.pdf")}
              onDownloadRgCnh={() => downloadFile(resp.rgCnh, "rgcnh.pdf")}
            />

          ))}
        </div>
      )}
    </Layout>
  );
}
