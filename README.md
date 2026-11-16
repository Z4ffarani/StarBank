![StarBank](./assets/banner.png)

**[Site](https://starbank.up.railway.app) · [Trailer](https://youtu.be/3rdr3UlUxWI)**

StarBank é o protótipo de um banco digital que aproveita tecnologias de ponta para oferecer a melhor experiência ao usuário, com simplicidade e dinamismo. O objetivo é tornar as rotinas financeiras mais fáceis e eficientes, promovendo a circulação do dinheiro. Cada cliente é tratado como uma estrela, com tudo orbitando a seu favor. Por isso, a plataforma oferece acesso prático por meio de um menu inteligente, suporte a vários idiomas e seções dedicadas a transferências, empréstimos, investimentos em ações, histórico e configurações da conta, tudo em uma única página.

---

## Arquitetura

### Front-end
Interface simples e prática, adaptável a qualquer dispositivo. O sistema é baseado em uma aplicação dinâmica, que usa o arquivo `Layout.tsx` para carregar os componentes em uma única página. O contexto com os dados do usuário é gerenciado pelo arquivo `UserContext.tsx`, enquanto o endereçamento das rotas segue a hierarquia de pastas. A função multilíngue é implementada com a biblioteca **[i18n](https://www.i18next.com)**, que traduz os textos da plataforma a partir de arquivos JSON. As transições suaves vêm da biblioteca **[framer-motion](https://www.npmjs.com/package/framer-motion)** e os ícones especiais da biblioteca **[react-icons](https://react-icons.github.io/react-icons/)**. Algumas funções avançadas de comunicação com o back-end ficam na pasta `providers`, centralizadas no provedor principal `AppProvider.tsx`, o que promove validação extensa de erros e generalização do código. A biblioteca **[Axios](https://axios-http.com/docs/intro)** gerencia as requisições HTTP.

### Back-end
Implementado seguindo o paradigma orientado a objetos. A configuração web fica no arquivo `WebConfig.java`, que permite a integração com o front-end sem conflitos de CORS. Os endpoints, na pasta `controller`, direcionam as funções específicas da pasta `services`, que por sua vez são validadas com rigor e interagem com os modelos definidos na pasta `DTO`. Esses modelos guardam os dados necessários para executar as tarefas no servidor.

---

## Como executar

### Pré-requisitos
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**

1. Clone o repositório:
```bash
git clone https://github.com/Z4ffarani/StarBank.git
```

2. Na pasta `front-end`, abra o `Dockerfile`, comente a seção `Production code section` e descomente a seção `Development code section`.

3. Na pasta `back-end`, abra o `Dockerfile`, comente a seção `Production code section` e descomente a seção `Development code section`.

4. Na pasta do projeto, crie os contêineres a partir do `docker-compose.yml`:
```bash
cd StarBank
docker compose up
```

5. Em um novo terminal, acesse o contêiner do front-end, defina o ambiente como desenvolvimento e inicie o servidor:
```bash
docker exec -it starbank-front-end-1 sh
NODE_ENV=development npm run dev
```

6. Em outro terminal, acesse o contêiner do back-end e inicie o servidor:
```bash
docker exec -it starbank-back-end-1 sh
mvn spring-boot:run
```

Acesse o front-end em `http://localhost:3000` e o back-end em `http://localhost:8080`.

---

## Observações

- Não insira informações pessoais confidenciais no programa.
- A plataforma tem vulnerabilidades e não é recomendada para uso comercial.
- A plataforma foi projetada para tratar alguns erros de forma eficaz.
- Este projeto é apenas um protótipo e não deve ser considerado um sistema bancário legal.
- O saldo exibido é fictício e não tem valor real.
- StarBank é um nome fictício e não representa uma marca oficial.
- As ações disponíveis na plataforma são fictícias e não refletem valores reais de mercado.
- Testes de transferência só podem ser feitos com mais de um usuário cadastrado na plataforma.
- Os empréstimos não têm descontos na velocidade demonstrada, e os cálculos apresentados são apenas ilustrativos.
- Empréstimos e ações reais não rendem dinheiro na velocidade demonstrada.
- Na seção de configurações, é possível alterar o e-mail, a senha e o saldo, e até excluir a conta.
- Outras bibliotecas e ferramentas também foram usadas no desenvolvimento do projeto.

---

## Tecnologias

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://www.java.com)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com)
[![npm](https://img.shields.io/badge/npm-CB3837?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com)
[![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white)](https://railway.app)
