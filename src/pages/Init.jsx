import React, { useState } from "react";
import styles from "./Init.module.css";

const Init = () => {
  const [formType, setFormType] = useState(null);
  const [toolType, setToolType] = useState("");
  const [patrimonio, setPatrimonio] = useState("");

  const handleCardClick = (type) => {
    setFormType(type);
    setToolType("");
    setPatrimonio("");
  };

  const handleToolTypeChange = (e) => {
    setToolType(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Bem-vindo ao AlmoxPuc</h2>

      <div className={styles.cardsContainer}>
        <div
          className={styles.card}
          onClick={() => handleCardClick("adicionarFuncionario")}
        >
          <h3>Adicionar Funcionário</h3>
        </div>
        <div
          className={styles.card}
          onClick={() => handleCardClick("adicionarFerramenta")}
        >
          <h3>Adicionar Ferramenta</h3>
        </div>
        <div
          className={styles.card}
          onClick={() => handleCardClick("gerarRelatorioFerramenta")}
        >
          <h3>Gerar Relatório por Ferramenta</h3>
        </div>
        <div
          className={styles.card}
          onClick={() => handleCardClick("gerarRelatorioFuncionario")}
        >
          <h3>Gerar Relatório por Funcionário</h3>
        </div>
      </div>

      {formType === "adicionarFuncionario" && (
        <div className={styles.formContainer}>
          <h3>Formulário Adicionar Funcionário</h3>
          <form>
            <input type="text" placeholder="Nome do Funcionário" />
            <input type="text" placeholder="Registro" />
            <input type="text" placeholder="Cargo" />
            <button type="submit">Adicionar</button>
          </form>
        </div>
      )}

      {formType === "adicionarFerramenta" && (
        <div className={styles.formContainer}>
          <h3>Formulário Adicionar Ferramenta</h3>
          <form>
            <input type="text" placeholder="Nome da Ferramenta" />
            <input type="number" placeholder="Quantidade" />

            <div className={styles.selectPatrimonio}>
              <div style={{ flex: 1 }}>
                <label>Tipo de Ferramenta</label>
                <select value={toolType} onChange={handleToolTypeChange}>
                  <option value="">Selecione o tipo</option>
                  <option value="manual">Manual</option>
                  <option value="eletrica">Elétrica</option>
                </select>
              </div>

              {toolType === "eletrica" && (
                <input
                  type="text"
                  placeholder="Número de Patrimônio"
                  value={patrimonio}
                  onChange={(e) => setPatrimonio(e.target.value)}
                />
              )}
            </div>

            <button type="submit">Adicionar</button>
          </form>
        </div>
      )}

      {formType === "gerarRelatorioFerramenta" && (
        <div className={styles.formContainer}>
          <h3>Relatório por Ferramenta</h3>
          <form className={styles.inputRelatorio}>
            <input type="text" placeholder="Escolha a ferramenta" />
            <button type="submit">Gerar Relatório</button>
          </form>
        </div>
      )}

      {formType === "gerarRelatorioFuncionario" && (
        <div className={styles.formContainer}>
          <h3>Relatório por Funcionário</h3>
          <form className={styles.inputRelatorio}>
            <input type="text" placeholder="Nome do Funcionário" />
            <button type="submit">Gerar Relatório</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Init;