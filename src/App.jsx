import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import CriarConta from "./criarConta/CriarConta.jsx";
import Home from "./home/Home.jsx";
import ResponsaveisBusca from "./responsaveis/ResponsaveisBusca.jsx";
import ResponsaveisCriacao from "./responsaveis/ResponsaveisCriacao.jsx";
import AlunoBuscar from "./alunos/AlunoBuscar.jsx";
import AlunoCadastrar from "./alunos/AlunoCadastrar.jsx";
import AlunoFormulario from "./alunos/AlunoFormulario.jsx";

export default function App() {
  return (
    <Routes>
      {/*Autenticação*/}
      <Route path="/" element={<Login />} />
      <Route path="/criar-conta" element={<CriarConta />} />
      <Route path="/home" element={<Home />} />

      {/*Alunos*/}
      <Route path="/buscar-aluno" element={<AlunoBuscar />} />
      <Route path="/cadastrar-aluno" element={<AlunoCadastrar />} />
      <Route path="/cadastrar-aluno/:responsavelId" element={<AlunoFormulario />} />

      {/*Responsáveis*/}
      <Route path="/buscar-responsavel" element={<ResponsaveisBusca />} />
      <Route path="/cadastrar-responsavel" element={<ResponsaveisCriacao />} />
    </Routes>
  );
}
