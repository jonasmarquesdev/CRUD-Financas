# Aplicação de Gerenciamento de Transações Financeiras

## Descrição
Este projeto é uma aplicação de gerenciamento de transações financeiras desenvolvida em Angular. A aplicação permite que os usuários adicionem, editem e excluam transações financeiras, categorizadas como receitas ou despesas. A comunicação com o backend é feita através de uma API REST implementada em Laravel.

## Tecnologias Utilizadas
- **Frontend**: Angular `v16`
- **Backend**: Laravel `v9`
- **Banco**: MySQL
- **Estilização**: Angular Material
- **Gerenciamento de Estado**: RxJS
- **HTTP Client**: Angular HttpClient

## Funcionalidades
- Listagem de transações financeiras com opções de filtro por tipo (receita ou despesa).
- Adição de novas transações através de um formulário.
- Edição de transações existentes.
- Exclusão de transações.

## Estrutura do Projeto
```
src/
├── app/
│   ├── models/                  # Modelos TypeScript
│   ├── services/                # Serviços para comunicação com a API
│   ├── components/              # Componentes da aplicação
│   ├── transaction-dialog/       # Diálogo para adição e edição de transações
│   ├── transaction-list/         # Componente para listagem de transações
│   └── app.module.ts             # Módulo principal da aplicação
├── assets/                       # Recursos estáticos (imagens, ícones, etc.)
└── index.html                    # Arquivo HTML principal
```

## Configuração do Ambiente
Para configurar e executar a aplicação, siga os passos abaixo:

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie a aplicação**
   ```bash
   npm run start
   ```

4. **Acesse a aplicação**
   Abra o navegador e acesse `http://localhost:4200`.

## Uso
- **Adicionar Transação**: Clique no botão "Adicionar" para abrir o diálogo de adição de transação. Preencha os campos obrigatórios e clique em "Adicionar".
- **Editar Transação**: Clique no botão de edição ao lado de uma transação para abrir o diálogo pré-preenchido. Faça as alterações desejadas e clique em "Adicionar".
- **Excluir Transação**: Clique no botão de excluir ao lado de uma transação para removê-la.

## Configuração dos Arquivos de Ambiente no Frontend

### 1. Criar a Pasta e os Arquivos de Ambiente

Dentro do diretório `src` do projeto, crie uma pasta chamada `environments`, caso ela ainda não exista:

```
src/
└── environments/
    ├── environment.ts
    └── environment.prod.ts
```

### 2. Configurar os Arquivos de Ambiente

Crie e configure os arquivos `environment.ts` e `environment.prod.ts` da seguinte forma:

- **environment.ts**: para o ambiente de desenvolvimento

  ```typescript
  export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000/api/transacoes'
  };
  ```

- **environment.prod.ts**: para o ambiente de produção

  ```typescript
  export const environment = {
    production: true,
    apiUrl: 'https://localhost:8000/api/transacoes'
  };
  ```

> **Nota**: Substitua o valor de `apiUrl` pelo endpoint correto da sua API em cada ambiente.


## Executando Scripts SQL pelo CMD

Para configurar o banco de dados, você pode executar um script `.sql` diretamente pelo CMD do Windows:

1. **Execute o Script .sql**:
   - Use o comando abaixo. Substitua `<usuario>`, `<senha>`, `<banco_de_dados>`, e o caminho do arquivo `.sql`:
   ```bash
   mysql -u <usuario> -p<senha> <banco_de_dados> < "C:\caminho\para\seu_script.sql"
   ```

   **Exemplo**:
   ```bash
   mysql -u root -pminha_senha meu_banco < "C:\Users\seu_usuario\Desktop\meu_script.sql"
   ```

   - **Observação**: Se você omitir a senha (use apenas `-p`), o MySQL pedirá para digitá-la.

2. **Confirme a Execução**:
   - Se não houver mensagens de erro, o script foi executado com sucesso.

## Configuração dos Arquivos de Ambiente no Backend
Antes de iniciar a API, você precisa configurar o arquivo `.env` com os detalhes do banco de dados. Use o arquivo `.env-example` como referência e preencha os campos necessários

## API
A aplicação se comunica com a seguinte API para operações de transações financeiras:

- **GET** `/api/transacoes`: Retorna todas as transações.
   - Parâmetros opcionais:
    - `tipo`: Filtra pelo ID do tipo (ex.: `?tipo=1`).
    - `orderData`: Ordena pela data (`asc` ou `desc`, padrão `desc` - ex.: `?orderData=asc`).
- **GET** `/api/transacoes/:id`: Retorna uma transação específica pelo ID.
- **POST** `/api/transacoes`: Adiciona uma nova transação.
- **PUT** `/api/transacoes/:id`: Atualiza uma transação existente.
- **DELETE** `/api/transacoes/:id`: Exclui uma transação.

Para iniciar o backend do projeto usando Laravel, siga os passos abaixo:

1. **Acesse a Pasta do Backend**:
   ```bash
   cd ./backend
   ```

2. **Instale as Dependências**:
   - Use o comando a seguir para instalar as dependências tanto do Node.js quanto do PHP (Composer):
   ```bash
   npm install && composer install
   ```

3. **Inicie o Servidor Local**:
   - Após instalar as dependências, inicie o servidor com:
   ```bash
   php artisan serve
   ```

   - Esse comando inicia a API no servidor local, geralmente acessível em `http://127.0.0.1:8000`.

## Contribuição
Se você deseja contribuir para este projeto, sinta-se à vontade para abrir uma nova issue ou enviar um pull request.
