import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export default function NotFound() {
  useEffect(() => {
    document.title = "Página não encontrada | Lista de Tarefas";
  }, []);

  return (
    <main className="page-404" aria-labelledby="page-404-title">
      <div className="page-404-content">
        <h1 id="page-404-title">Página não encontrada</h1>

        <div className="page-404-code" aria-hidden="true">
          404
        </div>

        <p className="page-404-text">
          A página que você procura não existe ou foi movida.
        </p>

        <Link className="page-404-button" to="/">
          Voltar ao início
        </Link>
      </div>

      <div className="page-404-bg" aria-hidden="true" />
    </main>
  );
}
