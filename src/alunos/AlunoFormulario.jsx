import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout.jsx";

export default function AlunoFormulario() {
  const { responsavelId } = useParams();

  return (
    <Layout>
      <div style={{ padding: "20px" }}>
        <h1>Cadastro de Aluno</h1>
        <p>Responsável selecionado: <strong>{responsavelId}</strong></p>
        <p>Em breve aqui estará o formulário completo do aluno.</p>
      </div>
    </Layout>
  );
}
