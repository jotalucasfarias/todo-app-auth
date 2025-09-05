import { useState, useEffect } from "react";
import "./admin.css";
import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

export default function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState({});

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "tarefas");
        const q = query(
          tarefaRef,
          where("userUid", "==", data?.uid),
          orderBy("created", "desc")
        );

        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            console.log(doc.data());
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid,
            });
          });

          setTarefas(lista);
        });
      }
    }

    loadTarefas();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if (tarefaInput === "") {
      alert("Digite sua tarefa!");
      return;
    }

    if(edit?.id){
      // Atualizando a tarefa
      handleUpdateTarefa();
      return;
    }


    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid,
    })
      .then(() => {
        console.log("Tarefa registrada com sucesso!");
        setTarefaInput("");
      })
      .catch((error) => {
        console.log("Erro ao registrar!", error);
      });
  }

  async function handleLogout() {
    // deslogar o usuario
    await signOut(auth);
  }

  async function deleteTarefa(id) {
    // Deletar a tarefa
    const docRef = doc(db, "tarefas", id);
    await deleteDoc(docRef);
  }

  function editTarefa(item) {
    // Editar a tarefa
    setTarefaInput(item.tarefa);
    setEdit(item);
  }

  async function handleUpdateTarefa() {
    const docRef = doc(db, "tarefas", edit?.id);
    await updateDoc(docRef, {
      tarefa: tarefaInput
    }).then(() => {
      console.log("Tarefa atualizada!");
      setTarefaInput("");
      setEdit({});
    }).catch((error) => {
      console.log("Erro ao atualizar!", error);
      setTarefaInput("");
      setEdit({});
    });
  }

  return (
    <div className="admin-container">
      <h1>Minhas Tarefas</h1>

      <form className="form" onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />

        {Object.keys(edit).length > 0 ? (
          <button className="btn-register" type="submit">
            Atualizar Tarefa
          </button>
        ) : (
          <button className="btn-register" type="submit">
            Registrar Tarefa
          </button>
        )}
      </form>

      {tarefas.map((item) => (
        <article key={item.id} className="list-tasks">
          <p> {item.tarefa} </p>

          <div>
            <button className="btn-edit" onClick={() => editTarefa(item)}>
              Editar
            </button>
            <button
              className="btn-delete"
              onClick={() => deleteTarefa(item.id)}
            >
              Concluir
            </button>
          </div>
        </article>
      ))}

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
