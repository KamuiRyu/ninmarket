# Nin Market

Este é o meu projeto de uma plataforma para facilitar as trocas dentro do jogo chamado Nin Online. A plataforma atua como um sistema de leilões, permitindo que os jogadores negociem itens e recursos valiosos de forma mais eficiente e conveniente.

## Descrição do Projeto

O Nin Market é uma solução dedicada aos jogadores do Nin Online, um jogo online multiplayer baseado em anime. Através dessa plataforma, os jogadores podem realizar trocas e negociações de itens, equipamentos e recursos em um ambiente seguro e intuitivo.

A plataforma oferece recursos avançados para a realização das transações, incluindo:

- Listagem de itens disponíveis para troca, com detalhes e informações relevantes.
- Funcionalidade de pesquisa para encontrar itens específicos desejados.
- Sistema de leilões, permitindo que os jogadores façam lances em itens disputados.
- Recursos de chat e mensagens para facilitar a comunicação entre os jogadores durante as negociações.
- Histórico de transações para referência e controle.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- PHP (v7.4 ou superior)
- Composer (v2.x ou superior)
- Node.js (v14.x ou superior)
- npm (v6.x ou superior)
- PostgreSQL ou outro banco de dados compatível

## Instalação

Siga os passos abaixo para configurar o projeto em sua máquina local:

1. Clone o repositório para o seu ambiente de desenvolvimento:

   ```bash
   git clone https://github.com/KamuiRyu/ninmarket.git
   ```

2. Navegue até 'ninmarket/web':

   ```bash
   cd ninmarket/web
   ```

3. Instale as dependências do Laravel utilizando o Composer:

   ```bash
   composer install
   ```

4. Copie o arquivo de configuração .env.example para .env:

   ```bash
   cp .env.example .env
   ```

5. Configure o arquivo .env com as informações do seu banco de dados e outras configurações necessárias.

6. Gere uma nova chave de aplicativo:

   ```bash
   php artisan key:generate
   ```

7. Instale as dependências do frontend React utilizando o npm:

   ```bash
   cd ./app
   npm install
   ```

## Executando o projeto

Após a instalação das dependências, você pode executar o projeto da seguinte forma:

1. Abra uma janela do terminal e navegue até a pasta "web" para iniciar o servidor Laravel:

   ```bash
   php artisan serve
   ```

2. Abra outra janela do terminal e navegue até a pasta "app" para iniciar o servidor React:

   ```bash
   cd app
   npm start
   ```

O servidor do Laravel estará disponível em http://localhost:8000, enquanto o servidor de desenvolvimento do React estará disponível em http://localhost:3000. Agora você pode começar a explorar e interagir com a plataforma Nin Online Exchange.

## Executando servidores Laravel e React simultaneamente

Para executar os servidores Laravel e React simultaneamente, você pode usar um script personalizado. Abra uma janela do terminal e execute o seguinte comando:

   ```bash
   npm run dev
   ```

Isso iniciará tanto o servidor Laravel quanto o servidor React ao mesmo tempo. Você poderá acessar a plataforma completa através do navegador.

## Outros comandos disponíveis

Além dos comandos de execução, existem outros comandos úteis disponíveis:

- php artisan migrate: Executa as migrações do banco de dados.

- php artisan db:seed: Executa os seeders para popular o banco de dados com dados de exemplo.

- cd app && npm run build: Compila o frontend React para produção, gerando uma versão otimizada em uma pasta chamada public/build.

- cd app && npm run watch: Observa alterações nos arquivos do frontend React e compila automaticamente durante o desenvolvimento.

## Licença

Este projeto está licenciado sob a MIT License.
