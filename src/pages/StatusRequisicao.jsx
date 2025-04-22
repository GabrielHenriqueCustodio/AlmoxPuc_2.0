import React, { useEffect, useState } from "react";
import styles from "./StatusRequisicao.module.css";

function StatusRequisicao() {
  const [requisicoes, setRequisicoes] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [filtroStatus, setFiltroStatus] = useState("");

  useEffect(() => {
    const requisicoesSalvas = localStorage.getItem("requisicoes");
    if (requisicoesSalvas) {
      setRequisicoes(JSON.parse(requisicoesSalvas));
    }
  }, []);

  const handleToggleExpand = (numeroRequisicao) => {
    setExpandedCard(
      expandedCard === numeroRequisicao ? null : numeroRequisicao
    );
  };

  const handleChangeStatus = (numeroRequisicao) => {
    const updatedRequisicoes = requisicoes.map((req) =>
      req.numero === numeroRequisicao
        ? {
            ...req,
            status: req.status === "emprestada" ? "devolvida" : "emprestada",
          }
        : req
    );

    setRequisicoes(updatedRequisicoes);
    localStorage.setItem("requisicoes", JSON.stringify(updatedRequisicoes));
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
              key={requisicao.numero}
              className={`${styles.requisicaoCard} ${
                expandedCard === requisicao.numero ? styles.expanded : ""
              }`}
            >
              <div className={styles.requisicaoHeader}>
                <span>Requisição Nº {requisicao.numero}</span>
                <button
                  className={`${styles.expandButton} ${
                    expandedCard === requisicao.numero ? styles.open : ""
                  }`}
                  onClick={() => handleToggleExpand(requisicao.numero)}
                >
                  {expandedCard === requisicao.numero ? "-" : "+"}
                </button>
              </div>

              {expandedCard === requisicao.numero && (
                <div className={styles.requisicaoDetails}>
                  <p>
                    <strong>Funcionário:</strong> {requisicao.funcionario}
                  </p>
                  <p>
                    <strong>Ferramenta:</strong> {requisicao.ferramenta}
                  </p>
                  <p>
                    <strong>Quantidade:</strong> {requisicao.quantidade}
                  </p>
                  <p>
                    <strong>Patrimônio:</strong> {requisicao.patrimonio}
                  </p>
                  <p>
                    <strong>Tipo:</strong> {requisicao.tipo}
                  </p>
                  <p>
                    <strong>Status:</strong> {requisicao.status}
                  </p>

                  <button
                    onClick={() => handleChangeStatus(requisicao.numero)}
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