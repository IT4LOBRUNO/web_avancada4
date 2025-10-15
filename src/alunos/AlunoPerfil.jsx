// src/aluno/AlunoPerfil.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Layout from "../components/Layout.jsx";
import { downloadBase64File } from "../components/DownloadHelper.jsx";

export default function AlunoPerfil() {
  const { id } = useParams();
  const [aluno, setAluno] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        const docRef = doc(db, "alunos", id);
        const snap = await getDoc(docRef);
        if (snap.exists()) setAluno(snap.data());
      } catch (error) {
        console.error("Erro ao carregar aluno:", error);
      } finally {
        setCarregando(false);
      }
    };
    fetchAluno();
  }, [id]);

  if (carregando) return <Layout><p>Carregando...</p></Layout>;
  if (!aluno) return <Layout><p>Aluno não encontrado.</p></Layout>;

  const { alunoData, documentos, arquivos } = aluno;

  return (
    <Layout>
      <h1>Perfil do Aluno</h1>

      <div style={{ marginTop: 20 }}>
        <p><strong>Nome:</strong> {alunoData?.nome}</p>
        <p><strong>Data de Nascimento:</strong> {alunoData?.dataNascimento}</p>
        <p><strong>Gênero:</strong> {alunoData?.genero}</p>
        <p><strong>CPF:</strong> {documentos?.cpf}</p>
        <p><strong>RG:</strong> {documentos?.rg}</p>
        <p><strong>SUS:</strong> {documentos?.sus}</p>
        <p><strong>Responsável:</strong> {aluno.responsavelNome}</p>
      </div>

      <h3 style={{ marginTop: 30 }}>Documentos</h3>
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button onClick={() => downloadBase64File(arquivos?.certidaoNascimento, "certidaoNascimento.pdf")}>
          Baixar Certidão
        </button>
        <button onClick={() => downloadBase64File(arquivos?.rg, "rg.pdf")}>
          Baixar RG
        </button>
        <button onClick={() => downloadBase64File(arquivos?.comprovanteResidencia, "comprovanteResidencia.pdf")}>
          Baixar Comprovante
        </button>
      </div>
    </Layout>
  );
}
