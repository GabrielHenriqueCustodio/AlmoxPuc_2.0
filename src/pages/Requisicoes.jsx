import React, { useState, useEffect } from "react";
import styles from "./Requisicoes.module.css";

function Requisicoes() {
  const [formaRequisicao, setFormaRequisicao] = useState("");
  const [ferramentas, setFerramentas] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedTool, setSelectedTool] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedFuncionario, setSelectedFuncionario] = useState("");
  const [selectedPatrimonio, setSelectedPatrimonio] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ferramentasResponse = await fetch("http://localhost:3333/ferramentas");
        const funcionariosResponse = await fetch("http://localhost:3333/funcionarios");

        const ferramentasData = await ferramentasResponse.json();
        const funcionariosData = await funcionariosResponse.json();

        setFerramentas(ferramentasData);
        setFuncionarios(funcionariosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const ferramentasManuais = ferramentas.filter((tool) => tool.tipo === "manual");
  const ferramentasEletricas = ferramentas.filter((tool) => tool.tipo === "eletrica");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ferramentaSelecionada = ferramentas.find((f) => f.nome === selectedTool);
    const funcionarioSelecionado = funcionarios.find((f) => f.nome === selectedFuncionario);

    if (!ferramentaSelecionada || !funcionarioSelecionado) {
      alert("Selecione uma ferramenta e um funcionário válidos!");
      return;
    }

    const novoEmprestimo = {
      id_funcionario: funcionarioSelecionado.id,
      id_ferramenta: ferramentaSelecionada.id,
      tipo: formaRequisicao,
      quantidade: formaRequisicao === "manual" ? selectedQuantity : 1,
      numero_identificacao: selectedPatrimonio,
      status: "emprestada",
    };

    try {
      const response = await fetch("http://localhost:3333/emprestimos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoEmprestimo),
      });

      if (response.ok) {
        alert("Requisição registrada com sucesso!");
        setSelectedTool("");
        setSelectedQuantity(1);
        setSelectedFuncionario("");
        setSelectedPatrimonio("");
        setFormaRequisicao("");
      } else {
        alert("Erro ao registrar requisição!");
      }
    } catch (error) {
      console.error("Erro ao enviar requisição:", error);
    }
  };

  const patrimonioDisponivel = ferramentasEletricas
    .filter((tool) => tool.nome === selectedTool)
    .map((tool) => tool.numero_identificacao)
    .filter((pat) => pat); // Evitar patrimônios nulos

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Formulário de Requisição</h1>
      <div className={styles.formContainer}>
        <div className={styles.selectGroup}>
          <select
            value={formaRequisicao}
            onChange={(e) => setFormaRequisicao(e.target.value)}
            className={styles.select}
          >
            <option value="">Selecione</option>
            <option value="manual">Manual</option>
            <option value="eletrica">Elétrica</option>
          </select>
        </div>

        {formaRequisicao === "manual" && (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.selectGroup}>
              <select
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                className={styles.select}
                required
              >
                <option value="">Selecione uma ferramenta</option>
                {ferramentasManuais.map((tool) => (
                  <option key={tool.id} value={tool.nome}>
                    {tool.nome} - {tool.quantidade} disponível
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectGroup}>
              <input
                type="number"
                value={selectedQuantity}
                onChange={(e) => setSelectedQuantity(e.target.value)}
                min="1"
                max={
                  ferramentasManuais.find((tool) => tool.nome === selectedTool)
                    ?.quantidade || 1
                }
                placeholder="Quantidade"
                required
              />
            </div>

            <div className={styles.selectGroup}>
              <select
                value={selectedFuncionario}
                onChange={(e) => setSelectedFuncionario(e.target.value)}
                className={styles.select}
                required
              >
                <option value="">Selecione um funcionário</option>
                {funcionarios.map((func) => (
                  <option key={func.id} value={func.nome}>
                    {func.nome}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className={styles.buttonSubmit}>
              Enviar Requisição
            </button>
          </form>
        )}

        {formaRequisicao === "eletrica" && (
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.selectGroup}>
              <select
                value={selectedTool}
                onChange={(e) => setSelectedTool(e.target.value)}
                className={styles.select}
                required
              >
                <option value="">Selecione uma ferramenta</option>
                {ferramentasEletricas.map((tool) => (
                  <option key={tool.id} value={tool.nome}>
                    {tool.nome}
                  </option>
                ))}
              </select>
            </div>

            {selectedTool && (
              <div className={styles.selectGroup}>
                <select
                  value={selectedPatrimonio}
                  onChange={(e) => setSelectedPatrimonio(e.target.value)}
                  className={styles.select}
                  required
                >
                  <option value="">Selecione o patrimônio</option>
                  {patrimonioDisponivel.map((pat, index) => (
                    <option key={index} value={pat}>
                      {pat}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className={styles.selectGroup}>
              <select
                value={selectedFuncionario}
                onChange={(e) => setSelectedFuncionario(e.target.value)}
                className={styles.select}
                required
              >
                <option value="">Selecione um funcionário</option>
                {funcionarios.map((func) => (
                  <option key={func.id} value={func.nome}>
                    {func.nome}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className={styles.buttonSubmit}>
              Enviar Requisição
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Requisicoes;