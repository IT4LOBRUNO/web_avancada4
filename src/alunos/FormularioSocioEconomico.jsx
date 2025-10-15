import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import InputField from "../components/InputField.jsx";
import SelectField from "../components/SelectField.jsx";
import Button from "../components/Button.jsx";
import FormSection from "../components/FormSection.jsx";
import FormHeader from "../components/FormHeader.jsx";
import CheckboxField from "../components/CheckboxField.jsx";


export default function FormularioSocioEconomico() {
  const location = useLocation();
  const navigate = useNavigate();
  const { responsavelId, responsavelNome, alunoData, documentos } = location.state || {};

  const [habitacao, setHabitacao] = useState({
    situacaoCasa: "",
    valorAluguel: "",
    numComodos: "",
    piso: "",
    tipoMoradia: "",
    cobertura: "",
    fossa: "",
    cifon: "",
    energia: "",
    agua: "",
  });

  const [bens, setBens] = useState({
    tv: false,
    dvd: false,
    radio: false,
    computador: false,
    notebook: false,
    telefoneFixo: false,
    telefoneCelular: false,
    tablet: false,
    internet: false,
    tvAssinatura: false,
    fogao: false,
    geladeira: false,
    freezer: false,
    microOndas: false,
    maquinaLavar: false,
    arCondicionado: false,
    bicicleta: false,
    moto: false,
    automovel: false,
  });

  const handleNext = () => {
    // Apenas teste: exibir dados no console
    console.log("Habitacao:", habitacao);
    console.log("Bens:", bens);

    navigate("/alunos/formulario-conclusao", {
      state: { responsavelId, responsavelNome, alunoData, documentos, habitacao, bens },
    });
  };

  return (
    <Layout>
      <FormSection>
        <FormHeader
          title="Cadastro Socioeconômico do Aluno"
          subtitle={`Responsável: ${responsavelNome} | Aluno: ${alunoData?.nome}`}
        />

        <h3>Situação Habitacional</h3>

        <SelectField
          label="Situação da Casa"
          value={habitacao.situacaoCasa}
          onChange={(v) => setHabitacao({ ...habitacao, situacaoCasa: v })}
          options={[
            { label: "Casa Própria", value: "casa_propria" },
            { label: "Casa Cedida", value: "casa_cedida" },
            { label: "Casa Alugada", value: "casa_alugada" },
          ]}
        />

        <InputField
          label="Valor do Aluguel (R$)"
          value={habitacao.valorAluguel}
          onChange={(v) => setHabitacao({ ...habitacao, valorAluguel: v })}
        />

        <InputField
          label="Número de Cômodos"
          value={habitacao.numComodos}
          onChange={(v) => setHabitacao({ ...habitacao, numComodos: v })}
        />

        <SelectField
          label="Piso"
          value={habitacao.piso}
          onChange={(v) => setHabitacao({ ...habitacao, piso: v })}
          options={[
            { label: "Cimento", value: "cimento" },
            { label: "Lajota", value: "lajota" },
            { label: "Chão Batido", value: "chao_batido" },
          ]}
        />

        <SelectField
          label="Tipo de Moradia"
          value={habitacao.tipoMoradia}
          onChange={(v) => setHabitacao({ ...habitacao, tipoMoradia: v })}
          options={[
            { label: "Tijolo", value: "tijolo" },
            { label: "Taipa", value: "taipa" },
            { label: "Madeira", value: "madeira" },
          ]}
        />

        <SelectField
          label="Cobertura"
          value={habitacao.cobertura}
          onChange={(v) => setHabitacao({ ...habitacao, cobertura: v })}
          options={[
            { label: "Telha", value: "telha" },
            { label: "Zinco", value: "zinco" },
            { label: "Palha", value: "palha" },
          ]}
        />

        <h3>Saneamento</h3>

        {["fossa", "cifon", "energia", "agua"].map((campo) => (
          <SelectField
            key={campo}
            label={campo === "fossa" ? "Fossa" : campo === "cifon" ? "Cifon" : campo === "energia" ? "Energia Elétrica" : "Água Encanada"}
            value={habitacao[campo]}
            onChange={(v) => setHabitacao({ ...habitacao, [campo]: v })}
            options={[
              { label: "Sim", value: "sim" },
              { label: "Não", value: "nao" },
            ]}
          />
        ))}

        <h3>No seu Domicílio Tem:</h3>
        {Object.keys(bens).map((item) => (
          <CheckboxField
            key={item}
            label={item.replace(/([A-Z])/g, " $1").toUpperCase()}
            checked={bens[item]}
            onChange={(v) => setBens({ ...bens, [item]: v })}
          />
        ))}

        <Button onClick={handleNext} style={{ marginTop: 20 }}>
          Próximo
        </Button>
      </FormSection>
    </Layout>
  );
}
