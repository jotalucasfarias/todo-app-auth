import { useState } from "react";
import "./home.css";

import { Link } from "react-router-dom";

import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // navegar para o /ADMIN
          navigate("/admin", { replace: true });
        })
        .catch((error) => {
          alert("Erro ao fazer login!");
        });
    } else {
      alert("Preencha todos os campos!");
    }
  }

  return (
    <div className="home-container">
      <h1>Lista de Tarefas</h1>
      <span>Gerencie sua agenda de forma fácil.</span>

      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite sua email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          autoComplete={false}
          type="password"
          placeholder="Digite sua senha..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" aria-label="Acessar">
          Acessar
        </button>
      </form>

      <p className="texto-link">
        Não tem uma conta?{" "}
        <Link className="link-acao" to="/register">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
