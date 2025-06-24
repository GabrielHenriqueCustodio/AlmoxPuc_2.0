import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [codigoAcesso, setCodigoAcesso] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");

    try {
      const response = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigoAcesso, senha }),
      });

      if (response.ok) {
        navigate("/home");
      } else {
        const data = await response.json();
        setErro(data.error || "Falha no login.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.title}>Acesso ao Sistema</h2>

        <div>
          <input
            type="text"
            placeholder="Código de Acesso"
            value={codigoAcesso}
            onChange={(e) => setCodigoAcesso(e.target.value)}
            className={styles.input}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className={styles.input}
          />
        </div>

        {erro && <p className={styles.error}>{erro}</p>}

        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;