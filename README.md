# Open WMS Backend
  
## Apresentação

Esse projeto foi pensado e desenvolvido para o primeiro hackathon da Rocketseat.

Minha equipe está desenvolvendo um WMS(Warehouse management system) grátis para o público, onde qualquer pessoa pode se tornar um usuário e realizar o controle de inventário de sua empresa. Visamos atingir um público que não acreditam ser valido adquirir um sistema de WMS(pois geralmente é muito caro).

Esse projeto é desenvolvido com JS, TS, Docker(Imagem BD & Instanciamento do app), Jest(Testes), Typeorm(DB ORM), Swagger/SwaggerUI(Documentação) e Postgres(DB).

## Instalação & Execução

Você vai precisar de **npm/yarn**, **nodejs**, **docker** e **docker-compose** para poder rodar nosso backend.

Instale as dependências com:

```shell
yarn OU npm install
```

Temos um arquivo na pasta raiz do projeto, chamado **"ormconfig.example.json"**. Este arquivo contém as configuraçōes do banco e você deve copiar seu conteúdo e criar um **"ormconfig.json"**. Da mesma forma, temos um arquivo **".env.example"**, onde também é preciso copiar seu conteúdo e criar um **".env"**(Em ambos já deixamos com valores padrōes para rodar o projeto, só altere caso precise alterar pro seu caso).

Em seguida, rode o seguinte comando para rodar as migrations do banco de dados:

```shell
yarn typeorm migration:run
```

Como já mencionado acima, utilizamos o docker-compose para ser responsável por rodar nossa aplicação, em conjunto com seu banco de dados.
Para instalar nosso docker-compose:

```shell
docker-compose up -d
```

Após a finalização da instalação, a URL do projeto vai estar disponível em: **http://localhost:3333**.
Certifique-se de que esta porta está disponível.

Você pode observar os logs do backend através do seguinte comando:

```shell
docker logs hacka_wms -f 
```

Disponibilizamos uma rota para você garantir que a aplicação está online, você pode testar com um **GET em http://localhost:3333/ping**.

Nossa aplicação também conta com uma documentação de todas as suas features e ela está disponível em: **http://localhost:3333/api_docs**.

**OBS:** O docker-compose vai instalar uma instância do postgres na porta **5432**. Se esta porta já estiver em uso, talvez você tenha algum problema. Certifique-se de que ela também está disponível.

**OBS 2:** Nosso backend também sobe um segundo servidor express na porta **3332**, este servidor é responsável por notificar usuários de produtos perto de vencimento/estoque baixo, rodando cronjobs. Certifique-se de que essa porta também está disponível.

**OBS 3:** Por padrão, os emails serão enviados em modo de desenvolvimento([ethereal](https://ethereal.email/)), você pode ver o email enviado através dos logs do app. Caso deseje utilizar AWS, é preciso configurar suas credências nas variáveis ambientes do `.env`. Já deixamos o padrão no `.env.example`, caso opte por testar essa integração.

## Testes

Nossa aplicação conta com **testes unitários**([jest](https://jestjs.io/pt-BR/)) e **testes de integração**([supertest](https://github.com/visionmedia/supertest#readme)) para suas principais funcionalidades.

Para rodar os testes, **certifique-se de criar uma database chamada "hacka_wms_tests"**.

Em seguida, use o seguinte comando:

```shell
yarn test OU npm run test
```
