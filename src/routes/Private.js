import { useState, useEffect } from "react";
import { auth } from "../firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";


export default function Private({ children }) {
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const unsub = onAuthStateChanged(auth, (user) => {
        // se tiver um usuario, ele está logado
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
          };
          localStorage.setItem("@detailUser", JSON.stringify(userData));
          setLoading(false);
          setIsLogged(true);
        } else {
          //nao possui usuario logado
          setIsLogged(false);
          setLoading(false);
        }
      });
    }
    checkLogin();
  }, []);

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  if (!isLogged) {
    return <Navigate to="/" />;
  }

  return children;
}
