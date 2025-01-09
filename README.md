# Bloom Blog System 🏵️✨🗒️

O Bloom é um sistema de blog desenvolvido para permitir a criação, listagem, exibição, edição e exclusão de posts. Ele foi construído utilizando tecnologias modernas como Express.js no backend, Oracle SQL para o banco de dados, e Next.js 13 no frontend.
Este projeto é parte de um aprendizado contínuo em desenvolvimento web, com foco na integração entre front e backend.

## Funcionalidades Implementadas 📲

- **CRUD Completo de Posts:**
Criar, listar, visualizar, editar e excluir posts.

- **Sistema de Rotas Dinâmicas:**
Navegação amigável entre as páginas utilizando o Next.js.

- **Integração Backend-Frontend:**
API desenvolvida com Express.js conectada ao frontend com chamadas HTTP.

- **Estilo e Responsividade:**
Estilização moderna utilizando Tailwind CSS.

## Decisões Técnicas Relevantes 🆙

- **Arquitetura de Backend:**

  - Uso do framework **Express.js** pela sua simplicidade e compatibilidade com bibliotecas populares.

  - Banco de dados Oracle SQL para maior prática em sistemas relacionais robustos.
Implementação de middleware para tratamento de erros e validação de dados.

---

- **Frontend com Next.js 13:**

  - Escolha do Next.js pela sua capacidade de renderização híbrida e sistema de rotas dinâmicas.
    
  - Tailwind CSS para estilização rápida e responsiva.

---
    
- **Padrão RESTful:** 

  - Seguir boas práticas no desenvolvimento de endpoints.
  - Configuração de Variáveis de Ambiente:

  - Uso de .env para armazenar URLs de APIs e credenciais.
 
## Instruções para Rodar o Projeto Localmente 💻

Pré-requisitos:
  - Node.js (v16 ou superior)


## Como rodar o projeto localmente 🔁

Certifique-se de que o backend está rodando. Isso pode ser feito clonando o repositório correspondente e executando a API, conforme as instruções!
     - Repositorio: https://github.com/MaryChriss/Blog-Backend


- **Backend: 📑🖥️**

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/MaryChriss/Blog-Backend

2. **Entre no diretório do projeto:**
   ```bash
   cd Blog-backend

3. **Instale as dependências do projeto:**
   ```bash
   npm install
   
4. **Execute o projeto:**
   ```bash
   node index.js

- **Front-end: 🖥️✨**

  1. **Clone o repositório:**
   ```bash
   git clone https://github.com/MaryChriss/blog-front

2. **Entre no diretório do projeto:**
   ```bash
   cd blog-front

3. **Instale as dependências do projeto:**
   ```bash
   npm install
   
4. **Execute o projeto:**
   ```bash
   npm run dev
