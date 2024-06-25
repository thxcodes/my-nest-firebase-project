
# My NestJS Firebase Project

Este projeto é um exemplo de aplicação NestJS integrada com Firebase Functions e Firestore. Ele demonstra como criar um serviço escalável que pode ser facilmente testado.


[![Assista o Vídeo](https://img.youtube.com/vi/ssw64dHvB-s/0.jpg)](https://www.youtube.com/watch?v=ssw64dHvB-s "Assista o vídeo")


## Arquitetura do Projeto

A arquitetura deste projeto segue os princípios do NestJS, modularizando os componentes para facilitar a escalabilidade e a manutenção.

### Estrutura de Pastas

```
my-nest-firebase-project/
├── functions/
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── firebase.ts
│   │   ├── firestore/
│   │   │   ├── firestore.controller.ts
│   │   │   ├── firestore.module.ts
│   │   │   ├── firestore.service.ts
│   │   ├── test/
│   │   │   ├── firestore.controller.spec.ts
│   │   │   ├── firestore.service.spec.ts
│   ├── package.json
│   ├── tsconfig.json
├── firebase.json
├── .firebaserc
├── README.md
```

### Componentes Principais

- **FirestoreController**: Responsável por expor os endpoints para interagir com o Firestore, como a criação de registros.
- **FirestoreService**: Contém a lógica de negócio para criar registros no Firestore, utilizando o método `add`.
- **Testes**: Utilizam Jest para validar a funcionalidade do `FirestoreService` com mocks do Firebase.

## Instalação

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd my-nest-firebase-project
   ```

2. Instale as dependências:
   ```bash
   cd functions
   npm install
   ```

## Configuração do Firebase

### Pré-requisitos

- Instale a Firebase CLI:
  ```bash
  npm install -g firebase-tools
  ```

- Faça login no Firebase:
  ```bash
  firebase login
  ```

### Inicializar o Firebase no Projeto

1. **Configurar Firebase**:
   Navegue até o diretório `functions` e inicialize o Firebase (isso só precisa ser feito uma vez por desenvolvedor):
   ```bash
   cd functions
   firebase init
   ```

2. Durante a inicialização:
   - Selecione **Functions** e **Firestore**.
   - Escolha o projeto Firebase existente ou crie um novo.
   - Quando solicitado, selecione `TypeScript` como a linguagem para Functions.
   - Diga `No` para ESLint, a menos que você queira configurá-lo.
   - Escolha não sobrescrever arquivos existentes ao inicializar Functions.

3. **Configurar o arquivo `.firebaserc`**:
   Adicione o ID do projeto Firebase no arquivo `.firebaserc`:
   ```json
   {
     "projects": {
       "default": "YOUR_FIREBASE_PROJECT_ID"
     }
   }
   ```

## Rodar o Projeto

1. Compile o projeto:
   ```bash
   cd functions
   npm run build
   ```

2. Inicie os emuladores do Firebase:
   ```bash
   firebase emulators:start
   ```

## Rodar os Testes

1. Execute os testes:
   ```bash
   cd functions
   npm test
   ```

## Uso da API

### Endpoint para Criar Registros

Para criar um novo registro no Firestore, faça uma requisição POST para o seguinte endpoint:

```
POST http://127.0.0.1:5001/{YOUR_FIREBASE_PROJECT_ID}/{REGIAO}/api/firestore/create
POST http://127.0.0.1:5001/projeto-firebase-thx/southamerica-east1/api/firestore/create
```

#### Body da Requisição

A requisição deve conter um body JSON com o atributo `name` preenchido. Exemplo:

```json
{
  "name": "Nome do Registro"
}
```

## Licença

Este projeto está licenciado sob a licença MIT.
