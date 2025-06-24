import React, { useState, useEffect } from "react";
import styles from "./Init.module.css";

const Init = () => {
  const [formType, setFormType] = useState(null);
  const [toolType, setToolType] = useState("");

  const [nome, setNome] = useState("");
  const [registro, setRegistro] = useState("");
  const [cargo, setCargo] = useState("");

  const [nomeFerramenta, setNomeFerramenta] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [tipoFerramenta, setTipoFerramenta] = useState("");
  const [numeroIdentificacao, setNumeroIdentificacao] = useState("");

  const [filtroRelatorio, setFiltroRelatorio] = useState("");
  const [relatorio, setRelatorio] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);

  const handleCardClick = (type) => {
    setFormType(type);
    setToolType("");
    setNome("");
    setRegistro("");
    setCargo("");
    setNomeFerramenta("");
    setQuantidade("");
    setTipoFerramenta("");
    setNumeroIdentificacao("");
    setFiltroRelatorio("");
    setRelatorio([]);
  };

  const handleTipoFerramentaChange = (e) => {
    setTipoFerramenta(e.target.value);
  };

  const handleToolTypeChange = async (e) => {
    const tipo = e.target.value;
    setToolType(tipo);
    setFiltroRelatorio("");

    if (tipo === "funcionario") {
      try {
        const response = await fetch("http://localhost:3333/funcionarios");
        const data = await response.json();
        setFuncionarios(data);
      } catch (error) {
        console.error("Erro ao carregar funcionários:", error);
      }
    } else if (tipo === "ferramenta") {
      try {
        const response = await fetch("http://localhost:3333/ferramentas");
        const data = await response.json();
        setFerramentas(data);
      } catch (error) {
        console.error("Erro ao carregar ferramentas:", error);
      }
    }
  };

  const handleSubmitFuncionario = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3333/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, registro, cargo }),
      });

      if (response.ok) {
        alert("Funcionário cadastrado com sucesso!");
        setNome("");
        setRegistro("");
        setCargo("");
      } else {
        alert("Erro ao cadastrar funcionário!");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor!");
    }
  };

  const handleSubmitFerramenta = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3333/ferramentas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nomeFerramenta,
          quantidade: parseInt(quantidade),
          tipo: tipoFerramenta,
          numero_identificacao: numeroIdentificacao,
        }),
      });

      if (response.ok) {
        alert("Ferramenta cadastrada com sucesso!");
        setNomeFerramenta("");
        setQuantidade("");
        setTipoFerramenta("");
        setNumeroIdentificacao("");
      } else {
        alert("Erro ao cadastrar ferramenta!");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor!");
    }
  };

  const gerarRelatorio = async (e) => {
    e.preventDefault();

    if (!filtroRelatorio || !toolType) {
      alert("Selecione o tipo e o item para gerar o relatório!");
      return;
    }

    let url = "";

    if (toolType === "funcionario") {
      url = `http://localhost:3333/emprestimos/funcionario/${filtroRelatorio}`;
    } else if (toolType === "ferramenta") {
      url = `http://localhost:3333/emprestimos/ferramenta/${filtroRelatorio}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setRelatorio(data);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    }
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
          onClick={() => handleCardClick("gerarRelatorio")}
        >
          <h3>Consultar</h3>
        </div>
      </div>

      {formType === "adicionarFuncionario" && (
        <div className={styles.formContainer}>
          <h3>Formulário Adicionar Funcionário</h3>
          <form onSubmit={handleSubmitFuncionario}>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Registro"
              value={registro}
              onChange={(e) => setRegistro(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Cargo"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              required
            />
            <button type="submit">Adicionar</button>
          </form>
        </div>
      )}

      {formType === "adicionarFerramenta" && (
        <div className={styles.formContainer}>
          <h3>Formulário Adicionar Ferramenta</h3>
          <form onSubmit={handleSubmitFerramenta}>
            <input
              type="text"
              placeholder="Nome da Ferramenta"
              value={nomeFerramenta}
              onChange={(e) => setNomeFerramenta(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantidade"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              required
            />

            <div className={styles.selectPatrimonio}>
              <div style={{ flex: 1 }}>
                <label>Tipo de Ferramenta</label>
                <select
                  value={tipoFerramenta}
                  onChange={handleTipoFerramentaChange}
                  required
                >
                  <option value="">Selecione o tipo</option>
                  <option value="manual">Manual</option>
                  <option value="eletrica">Elétrica</option>
                </select>
              </div>

              {tipoFerramenta === "eletrica" && (
                <input
                  type="text"
                  placeholder="Número de Patrimônio"
                  value={numeroIdentificacao}
                  onChange={(e) => setNumeroIdentificacao(e.target.value)}
                />
              )}
            </div>

            <button type="submit">Adicionar</button>
          </form>
        </div>
      )}

      {formType === "gerarRelatorio" && (
        <div className={styles.formContainer}>
          <h3>Consultar</h3>
          <form onSubmit={gerarRelatorio} className={styles.inputRelatorio}>
            <label>Tipo de Consulta</label>
            <select value={toolType} onChange={handleToolTypeChange} required>
              <option value="">Selecione o tipo</option>
              <option value="ferramenta">Por Ferramenta</option>
              <option value="funcionario">Por Funcionário</option>
            </select>

            {toolType === "funcionario" && (
              <select
                value={filtroRelatorio}
                onChange={(e) => setFiltroRelatorio(e.target.value)}
                required
              >
                <option value="">Selecione o funcionário</option>
                {funcionarios.map((func) => (
                  <option key={func.id} value={func.id}>
                    {func.nome}
                  </option>
                ))}
              </select>
            )}

            {toolType === "ferramenta" && (
              <select
                value={filtroRelatorio}
                onChange={(e) => setFiltroRelatorio(e.target.value)}
                required
              >
                <option value="">Selecione a ferramenta</option>
                {ferramentas.map((ferramenta) => (
                  <option key={ferramenta.id} value={ferramenta.id}>
                    {ferramenta.nome}
                  </option>
                ))}
              </select>
            )}

            <button type="submit">Consultar</button>
          </form>

          {relatorio.length > 0 && (
            <div className={styles.resultadoRelatorio}>
              <h3>Resultado:</h3>
              <ul>
                {relatorio.map((item) => (
                  <li key={item.id}>
                    {toolType === "funcionario"
                      ? `Ferramenta: ${item.nome_ferramenta}, Status: ${item.status}`
                      : `Funcionário: ${item.nome_funcionario}, Status: ${item.status}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Init;
