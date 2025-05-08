![banner](./assets/banner.png)

# PROJECT
Starbank is a prototype of a digital bank that leverages cutting-edge technology to provide the best user experience with simplicity and dynamism. The goal is to make financial routines easier and more efficient, promoting the flow of money. Each client is treated like a star, with everything orbiting in their favor. For this reason, the platform offers practical access through an intelligent menu, multilingual support, and sections dedicated to money transfers, loans, stock investments, history, account settings, all in a single page.

## LINKS:
- **[Trailer]()**

<br>

# INSTRUCTIONS
1. Install **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**.

2. In the terminal, clone the repository:
```bash
git clone https://github.com/Z4ffarani/starbank.git
```

3. Navigate to the project folder:
```bash
cd StarBank
```

4. Open the folder in a container using the `docker-compose.yml` file:
```bash
docker compose up
```

5. Install the Node.js module packages:
```bash
npm install
```

6. Start the front-end development server:
```bash
npm run dev
```

7. Access the `back-end` folder connected to another container:
```bash
docker exec -it <container_id> bash
```

8. Access the front-end at: **http://localhost:3000**.

9. The back-end will be available at: **http://localhost:8080**.

<br>

# FUNCTIONS
- **Front-end** | A simple and practical interface, adaptable to any device. The system is based on a dynamic application, using the `Layout.tsx` file to load components on a single page. The user data context window is managed by the `UserContext.tsx` file, while route addressing is structured by folder hierarchy. Multilingual functionality is implemented with the **[i18n](https://www.i18next.com)** library API, enabling text translation on the platform through JSON files. Smooth transitions are provided by the **[framer-motion](https://www.npmjs.com/package/framer-motion)** library. Special icons are supplied by the **[react-icons](https://react-icons.github.io/react-icons/)** library. Some advanced communication functions with the back-end are located in the `providers` folder, centralized in the main provider `AppProvider.tsx`, promoting extensive error validation and code generalization. The **[Axios](https://axios-http.com/docs/intro)** library is used to manage HTTP requests.

- **Back-end** | Implemented following the object-oriented paradigm. The web configuration is handled in the `WebConfig.java` file, enabling integration with the front-end without CORS conflicts. Request endpoints, located in the `controller` folder, are responsible for directing specific functions from the `services` folder, which, in turn, are finely validated and interact with the models defined in the `DTO` folder. These models store the data necessary for executing tasks on the server.

<br>

# OBSERVATIONS
- Confidential personal information should not be entered into the program.

- The platform has vulnerabilities and is not recommended for production use.

- The platform is designed to handle some errors effectively.

- This project is only a prototype and should not be considered a legal banking system.

- The displayed balance is fictional and has no real value.

- StarBank is a fictional name and does not represent an official brand.

- The actions available on the platform are fictional and do not reflect real market values.

- Transfer tests can only be performed if more than one user is registered on the platform.

- Loans do not have discounts at the demonstrated speed, and the calculations presented are purely illustrative.

- Real stocks don’t distribute dividends at the speed demonstrated.

- It is possible to change the email, password, balance, and even delete the account in the settings section.

- More libraries and tools were used during the development of the project.

<br>

# TECHNOLOGIES
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev)
![NextJS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
