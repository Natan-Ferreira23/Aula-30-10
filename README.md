# Back end - aplicativo Motocilcista Consciente

Este projeto é o back end de um aplicativo chamado motociclista consciente, que visa ensinar e conscientizar atráves de um jogo de perguntas e respostas que é desenvolvido em Node.js e Express. Ele fornece uma API RESTful para gerenciar entidades como **usuários**, **módulos**, **certificados** e **atividades**.

---

## Tecnologias Utilizadas

- Node.js
- Express
- Swagger (para documentação de API)
- JavaScript

---

## Instalação

### Pré-requisitos
- Node.js (v20.x ou superior)
- NPM (Node Package Manager)

### Passos para Instalação
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   
2. Entre no diretório do projeto:
   ```bash
   cd nome-do-repositorio
    
3. Instale as dependências:
   ```bash
  npm install
```

6. Instalar para rodar o Swagger:
```bash
npm install swagger-jsdoc swagger-ui-express
```

5. Inicie o servidor:
   ```bash
   node server.js
```
## **Endpoints Principais**
###Método	Rota	Descrição
```bash
POST	/usuario/cadastro	Cadastrar um novo usuário
POST	/usuario/login	Realiza login do usuário
PUT     /usuario/editarNome Edita o nome de um usuário
PUT	/usuario/editarSenha	Alterar a senha do usuário
GET     /usuario/selecionarUsuario  Retorna os dados de um usuário pelo ID
GET	/api-docs	Acessar a documentação Swagger
Consulte a documentação completa no Swagger: http://localhost:3000/api-docs.
```

## **Estrutura de pastas**
```bash
📂 Back-End-CMTU-Node-js
├──📂 controllers
	├──alternativaController.js
	├──apiDadosController.js
	├──atividadeController.js
	├──certificadoController.js
	├──moduloController.js
	├──usuarioController.js
	├──usuario_moduloController.js    
├──📂 database
	├──db.js
	├──sqlDodB.db
├──📂 middlewares 
	├──authMiddleware.js
├──📂 routes 
	├──alternativaRoutes.js    
	├──apiDadosRoutes.js
	├──atividadeRoutes.js
	├──certificadoRoutes.js
	├──moduloRoutes.js
	├──usuarioRoutes.js
	├──usuario_moduloRoutes.js  
├── server.js          
├── swagger.js         
└── package.json       






