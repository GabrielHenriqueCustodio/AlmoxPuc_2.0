import React, { useState, useEffect } from 'react';
import { ferramentas } from '../api/apiTest';
import styles from './Ferramentas.module.css';

const Ferramentas = () => {
  const [ferramentasFiltradas, setFerramentasFiltradas] = useState(ferramentas);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');

  useEffect(() => {
    const filteredFerramentas = ferramentas.filter((ferramenta) => {
      const isNomeMatch = ferramenta.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const isTipoMatch = filtroTipo ? ferramenta.tipo === filtroTipo : true;
      return isNomeMatch && isTipoMatch;
    });

    setFerramentasFiltradas(filteredFerramentas);
  }, [searchTerm, filtroTipo]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ferramentas</h2>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Pesquisar ferramenta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.input}
        />
        <select
          value={filtroTipo}
          onChange={(e) => setFiltroTipo(e.target.value)}
          className={styles.select}
        >
          <option value="">Todos os tipos</option>
          <option value="manual">Ferramentas Manuais</option>
          <option value="eletrica">Ferramentas Elétricas</option>
        </select>
      </div>
      <div className={styles.ferramentasContainer}>
        {ferramentasFiltradas.map((ferramenta) => (
          <div key={ferramenta.id} className={styles.ferramentaBox}>
            <h3 className={styles.ferramentaNome}>{ferramenta.nome}</h3>
            <p className={styles.ferramentaQuantidade}>Quantidade: {ferramenta.quantidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ferramentas;