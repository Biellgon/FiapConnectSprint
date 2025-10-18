# 🧠 UniMatch — Encontre colegas com as habilidades certas!

UniMatch é um aplicativo desenvolvido em React Native com Expo que ajuda estudantes universitários a encontrarem colegas com habilidades complementares para formar grupos de projetos, TCCs ou hackathons.
Com ele, você pode criar um perfil, listar suas habilidades e buscar outros alunos por áreas de conhecimento, como front-end, back-end, design, dados e mais!

🚀 Tecnologias utilizadas

React Native (com Expo)

Expo Router / React Navigation

AsyncStorage (para armazenamento local)

TypeScript (opcional)

Node.js (para o backend, se houver)

Firebase ou API REST (para autenticação e banco de dados, se aplicável)

📱 Funcionalidades principais

✅ Cadastro e login de usuários
✅ Criação de perfil com nome, curso e habilidades
✅ Busca de alunos por habilidades específicas
✅ Sistema de recomendação de grupos com base nas habilidades
✅ Chat entre usuários (em versões futuras)

🧩 Estrutura de pastas (exemplo)
UniMatch/
├── assets/               # Imagens e ícones
├── components/           # Componentes reutilizáveis (Header, Card, etc.)
├── screens/              # Telas principais (Login, Cadastro, Buscar, Perfil)
├── services/             # Conexões com API ou Firebase
├── App.js                # Arquivo principal
├── package.json
└── README.md

⚙️ Como rodar o projeto localmente
1. 🧰 Pré-requisitos

Antes de começar, instale as seguintes ferramentas:

Node.js
 (versão LTS recomendada)

Expo CLI

Um editor de código como VS Code

Aplicativo Expo Go no celular (Android/iOS)

2. 📦 Clonar o repositório

Abra o terminal e digite:

git clone https://github.com/seu-usuario/UniMatch.git


Depois, entre na pasta do projeto:

cd UniMatch

3. 📥 Instalar as dependências
npm install


ou, se preferir usar o Yarn:

yarn install

4. ▶️ Iniciar o projeto com Expo
npx expo start


Isso abrirá um QR Code no terminal ou no navegador.
Escaneie com o app Expo Go no seu celular e pronto! 🎉

🧠 Possíveis melhorias futuras

Integração com Firebase Auth e Firestore

Sistema de match inteligente

Filtros avançados (curso, semestre, localização)

Envio de mensagens diretas entre alunos
