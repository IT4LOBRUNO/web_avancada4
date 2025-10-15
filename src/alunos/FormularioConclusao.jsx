import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Button from "../components/Button.jsx";
import FileUploader from "../components/FileUploader.jsx";
import { db } from "../firebase/firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

export default function FormularioConclusao() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    responsavelId,
    responsavelNome,
    alunoData,
    documentos,
    habitacao,
    bens,
  } = location.state || {};

  const [arquivos, setArquivos] = useState({
    rg: null,
    comprovanteResidencia: null,
    certidaoNascimento: null,
  });

  const [loading, setLoading] = useState(false);

  const handleFileChange = (campo, file) => {
    setArquivos((prev) => ({ ...prev, [campo]: file }));
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSave = async () => {
    // Validação básica
    if (!arquivos.rg || !arquivos.comprovanteResidencia || !arquivos.certidaoNascimento) {
      return alert("Por favor, envie todos os arquivos obrigatórios em PDF.");
    }

    setLoading(true);
    try {
      // Converter arquivos para Base64
      const rgBase64 = await fileToBase64(arquivos.rg);
      const comprovanteBase64 = await fileToBase64(arquivos.comprovanteResidencia);
      const certidaoBase64 = await fileToBase64(arquivos.certidaoNascimento);

      // Montar objeto para salvar
      const alunoDoc = {
        responsavelId,
        responsavelNome,
        alunoData,
        documentos,
        habitacao,
        bens,
        arquivos: {
          rg: rgBase64,
          comprovanteResidencia: comprovanteBase64,
          certidaoNascimento: certidaoBase64,
        },
        createdAt: new Date(),
      };

      // Salvar no Firestore
      await addDoc(collection(db, "alunos"), alunoDoc);

      alert("Dados do aluno salvos com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      alert("Ocorreu um erro ao salvar os dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
        <h1>Formulário de Conclusão</h1>
        <p>Envie os documentos do aluno em PDF:</p>

        <FileUploader
          label="Identidade (RG)"
          accept=".pdf"
          required
          onChange={(file) => handleFileChange("rg", file)}
        />

        <FileUploader
          label="Comprovante de Residência"
          accept=".pdf"
          required
          onChange={(file) => handleFileChange("comprovanteResidencia", file)}
        />

        <FileUploader
          label="Certidão de Nascimento"
          accept=".pdf"
          required
          onChange={(file) => handleFileChange("certidaoNascimento", file)}
        />

        <Button
          onClick={handleSave}
          style={{ marginTop: 20 }}
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </Layout>
  );
}
