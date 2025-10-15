import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Button from "../components/Button.jsx";
import FormSection from "../components/FormSection.jsx";
import FormHeader from "../components/FormHeader.jsx";
import DocumentosFields from "../components/DocumentosFields.jsx";

export default function FormularioDocumentos() {
  const location = useLocation();
  const navigate = useNavigate();
  const { responsavelNome, alunoData, responsavelId } = location.state || {};

  const [documentos, setDocumentos] = useState({
    rg: "",
    cpf: "",
    sus: "",
    corRaca: "",
    nomePai: "",
    nomeMae: "",
  });

  const handleNext = () => {
    const { rg, corRaca } = documentos;
    if (!rg || !corRaca) {
      return alert("Preencha todos os campos obrigatórios");
    }

    navigate("/alunos/formulario-socio-economico", {
      state: { responsavelId, responsavelNome, alunoData, documentos },
    });
  };

  return (
    <Layout>
      <FormSection>
        <FormHeader
          title="Cadastro de Documentos do Aluno"
          subtitle={`Responsável: ${responsavelNome} | Aluno: ${alunoData?.nome}`}
        />

        <DocumentosFields documentos={documentos} setDocumentos={setDocumentos} />

        <Button onClick={handleNext} style={{ marginTop: 20 }}>
          Próximo
        </Button>
      </FormSection>
    </Layout>
  );
}
