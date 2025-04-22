import React, { useState } from "react";
import { ferramentas, funcionarios } from '../api/apiTest';
import styles from './Requisicoes.module.css';

function Requisicoes() {
  const [formaRequisicao, setFormaRequisicao] = useState("");
  const [selectedTool, setSelectedTool] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedFuncionario, setSelectedFuncionario] = useState("");
  const [selectedPatrimonio, setSelectedPatrimonio] = useState("");

  const ferramentasManuais = ferramentas.filter(tool => tool.tipo === "manual");
  const ferramentasEletricas = ferramentas.filter(tool => tool.tipo === "eletrica");

  const gerarNumeroRequisicao = () => {
    // Gera um número aleatório entre 1000 e 9999
    return Math.floor(Math.random() * 9000) + 1000;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let requisicaoInfo = `Requisição para ${selectedFuncionario} de `;
    if (formaRequisicao === "manual") {
      requisicaoInfo += `${selectedQuantity} ${selectedTool}`;
    } else {
      requisicaoInfo += `1 ferramenta elétrica: ${selectedTool}, patrimônio ${selectedPatrimonio}`;
    }
    alert(requisicaoInfo);

    const requisicoesSalvas = JSON.parse(localStorage.getItem('requisicoes')) || [];
    const numeroRequisicao = gerarNumeroRequisicao();

    const novaRequisicao = {
      numero: numeroRequisicao,
      funcionario: selectedFuncionario,
      ferramenta: selectedTool,
      quantidade: formaRequisicao === "manual" ? selectedQuantity : 1,
      patrimonio: selectedPatrimonio || "não especificado",
      tipo: formaRequisicao,
      status: "emprestada",
      data: new Date().toISOString()
    };

    requisicoesSalvas.push(novaRequisicao);

    localStorage.setItem('requisicoes', JSON.stringify(requisicoesSalvas));
  };

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
              >
                <option value="">Selecione uma ferramenta</option>
                {ferramentasManuais.map((tool) => (
                  <option key={tool.id} value={tool.nome}>
                    {tool.nome} - {tool.quantidade} disponível(is)
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
                max={ferramentasManuais.find(tool => tool.nome === selectedTool)?.quantidade || 1}
                className={styles.select}
                placeholder="Quantidade"
              />
            </div>

            <div className={styles.selectGroup}>
              <select 
                value={selectedFuncionario} 
                onChange={(e) => setSelectedFuncionario(e.target.value)}
                className={styles.select}
              >
                <option value="">Selecione um funcionário</option>
                {funcionarios.map((funcionario) => (
                  <option key={funcionario.id} value={funcionario.nome}>
                    {funcionario.nome}
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
              >
                <option value="">Selecione uma ferramenta</option>
                {ferramentasEletricas.map((tool) => (
                  <option key={tool.id} value={tool.nome}>
                    {tool.nome} - {tool.quantidade} disponível(is)
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectGroup}>
              <select 
                value={selectedPatrimonio} 
                onChange={(e) => setSelectedPatrimonio(e.target.value)}
                className={styles.select}
              >
                <option value="">Selecione o patrimônio</option>
                {ferramentasEletricas
                  .find(tool => tool.nome === selectedTool)
                  ?.patrimonio.map((pat, index) => (
                    <option key={index} value={pat}>
                      {pat}
                    </option>
                  ))}
              </select>
            </div>

            <div className={styles.selectGroup}>
              <select 
                value={selectedFuncionario} 
                onChange={(e) => setSelectedFuncionario(e.target.value)}
                className={styles.select}
              >
                <option value="">Selecione um funcionário</option>
                {funcionarios.map((funcionario) => (
                  <option key={funcionario.id} value={funcionario.nome}>
                    {funcionario.nome}
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