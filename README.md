# Lista de Tarefas (todo-app-auth)

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=white)](https://reactjs.org/) [![Firebase](https://img.shields.io/badge/Firebase-12.2.1-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)]

Aplicação simples de Lista de Tarefas com autenticação (Email/Password) e persistência em Firestore. Permite registrar usuários, autenticar, criar/editar/remover tarefas e proteger rotas privadas.

Resumo rápido
- Frontend em React (Create React App).
- Autenticação com Firebase Authentication (email/senha).
- Dados das tarefas armazenados no Firestore.
- Rotas protegidas para usuários autenticados.

Tecnologias
- React
- React Router
- Firebase (Authentication & Firestore)
- Create React App

Demonstração de recursos
- Registro e login de usuários.
- Criação, edição e remoção de tarefas vinculadas ao usuário autenticado.
- Rota /admin protegida que só pode ser acessada por usuários logados.
- Tela de 404 personalizada.

Pré-requisitos
- Node.js v16+ (recomendado)
- Conta Firebase e um projeto criado

Instalação e execução (local)
1. Clone o repositório
   git clone <seu-repo-url>
   cd todo-app-auth

2. Instale dependências
   npm install

3. Configure variáveis de ambiente do Firebase
   Crie um arquivo `.env.local` na raiz do projeto com as chaves do seu projeto Firebase:

   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_DATABASE_URL=your_database_url
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   Observação: o repositório já ignora arquivos `.env*` via .gitignore — não comite credenciais.

4. Habilite no console do Firebase:
   - Authentication → Sign-in method → Email/Password (ativar)
   - Firestore Database → criar base de dados (modo de teste ou regras apropriadas)

5. Executar em modo de desenvolvimento
   npm start

6. Build para produção
   npm run build

Comandos úteis
- npm install — instala dependências
- npm start — inicia o servidor de desenvolvimento (http://localhost:3000)
- npm run build — cria build para produção

Estrutura principal
- src/
  - App.js — roteamento
  - firebaseConnection.js — inicialização do Firebase (auth + db)
  - pages/ — Home, Register, Admin, NotFound
  - routes/ — definição de rotas e componente Private para proteção

Boas práticas e observações
- Não armazene credenciais sensíveis em repositórios públicos.
- Em produção, ajuste regras do Firestore para restringir acesso por usuário.
- Considere adicionar validação mais robusta e tratamento de erros para UX mais amigável.
