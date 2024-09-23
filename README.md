# Projeto para apredizagem de colegas sobre api, apenas o básico

## Geral

Esse projeto contem o trabalho de cinco estudantes do curso técnico integrado em informática do IFPB, campus João Pessoa, e contempla a nota anual da disciplina LP2(linguagens de programação 2).

## Organização

O projeto foi organizado em módulos dividindo cada funcionalidade específica.
O banco de dados utilizado é SQLite, com consultas realizadas pelo prisma-client.

### Sobre a produção do time

Dentro do código há comentários destacando os blocos produzidos por cada um.

---

## iniciar o projeto

### setup banco de dados

Para iniciar o servidor do projeto, primeiro inicie o banco de dados prisma SQLite com os comandos abaixo

    $ npx prisma migrate dev --name init

### Inicio do server

Com o banco de dados em mão basta apenas instalar as dependencias do projeto

    $ npm i

Apos isso basta iniciar e ja poderá fazer requisições

    $ npm run dev
