import React, { useEffect, useState } from "react";
import styles from "./StatusRequisicao.module.css";

function StatusRequisicao() {
  const [requisicoes, setRequisicoes] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("");

  const fetchRequisicoes = async () => {
    try {
      const response = await fetch("http://localhost:3333/emprestimos");
      const data = await response.json();
      setRequisicoes(data);
    } catch (error) {
      console.error("Erro ao buscar requisições:", error);
      alert("Erro ao carregar requisições do servidor.");
    }
  };

  useEffect(() => {
    fetchRequisicoes();
  }, []);

  const handleToggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleChangeStatus = async (id, statusAtual) => {
    const novoStatus = statusAtual === "emprestada" ? "devolvida" : "emprestada";
    const body = { status: novoStatus };

    if (novoStatus === "devolvida") {
      body.data_devolucao = new Date().toISOString();
    }

    try {
      const response = await fetch(`http://localhost:3333/emprestimos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Erro ao atualizar status.");
      }

      fetchRequisicoes();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status da requisição.");
    }
  };

  const handleFiltroChange = (event) => {
    setFiltroStatus(event.target.value);
  };

  const requisicoesFiltradas = filtroStatus
    ? requisicoes.filter((req) => req.status === filtroStatus)
    : requisicoes;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Status das Requisições</h1>

      <div className={styles.searchContainer}>
        <select
          value={filtroStatus}
          onChange={handleFiltroChange}
          className={styles.select}
        >
          <option value="">Todos</option>
          <option value="emprestada">Emprestadas</option>
          <option value="devolvida">Devolvidas</option>
        </select>
      </div>

      {requisicoesFiltradas.length > 0 ? (
        <div className={styles.listContainer}>
          {requisicoesFiltradas.map((requisicao) => (
            <div
              key={requisicao.id}
              className={`${styles.requisicaoCard} ${
                expandedCard === requisicao.id ? styles.expanded : ""
              }`}
            >
              <div className={styles.requisicaoHeader}>
                <span>Requisição ID: {requisicao.id}</span>
                <button
                  className={`${styles.expandButton} ${
                    expandedCard === requisicao.id ? styles.open : ""
                  }`}
                  onClick={() => handleToggleExpand(requisicao.id)}
                >
                  {expandedCard === requisicao.id ? "-" : "+"}
                </button>
              </div>

              {expandedCard === requisicao.id && (
                <div className={styles.requisicaoDetails}>
                  <p>
                    <strong>Funcionário:</strong> {requisicao.nome_funcionario}
                  </p>
                  <p>
                    <strong>Ferramenta:</strong> {requisicao.nome_ferramenta}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {requisicao.tipo}
                  </p>
                  <p>
                    <strong>Quantidade:</strong> {requisicao.quantidade}
                  </p>

                  {requisicao.tipo === "eletrica" && (
                    <p>
                      <strong>Patrimônio:</strong> {requisicao.numero_identificacao}
                    </p>
                  )}

                  <p>
                    <strong>Status:</strong> {requisicao.status}
                  </p>

                  <button
                    onClick={() => handleChangeStatus(requisicao.id, requisicao.status)}
                    className={styles.statusButton}
                  >
                    {requisicao.status === "emprestada"
                      ? "Marcar como Devolvida"
                      : "Marcar como Emprestada"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Não há requisições registradas.</p>
      )}
    </div>
  );
}

export default StatusRequisicao;