# WMS Rocketseat Hackathon
  
## Apresentação
Esse projeto foi pensado e desenvolvido para o primeiro hackathon da Rocketseat.

Meu time está desenvolvendo um WMS(Warehouse management system) gratis para o publico, onde qualquer pessoa pode se tornar um usuario e realizar o controle de inventario de sua empresa. Visamos atingir um publico que não acreditam ser valido adquirir um sistema de WMS(pois geralmente é muito caro).

Esse projeto é desenvolvido com JS, TS, Docker(Imagem BD & Instanciamento do app), Jest(Testes), Typeorm(DB ORM) e Postgres(DB).

## Instalação & Execução
Você vai precisar de **npm/yarn**, **nodejs**, **docker** e **docker-compose** para poder rodar nosso backend.

Instale as dependencias com:
```shell
yarn OU npm install
```

Temos um arquivo na pasta raiz do projeto, chamado **"ormconfig.example.json"**. Este arquivo contém as configuraçōes do banco e você deve copia-lo e criar um **"ormconfig.json"** com o mesmo conteudo.

Em seguida, rode o seguinte comando para rodar as migrations do banco de dados:
```shell
yarn typeorm migration:run
```

Como já mencionado acima, utilizamos o docker-compose para ser responsavel por rodar nossa aplicação, em conjunto com seu banco de dados.
Para instalar nosso docker-compose:
```shell
docker-compose up -d
```

Após a finalização da instalação, a URL do projeto vai estar disponivel em: **http://localhost:3333**. 
Certifique-se de que esta porta está disponivel.

Disponibilizamos uma rota para você garantir que a aplicação está online, você pode testar com um **GET em http://localhost:3333/ping**.

Nossa aplicação também conta com uma documentação, ela está disponivel em: **http://localhost:3333/api_docs**.

**OBS:** O docker-compose vai instalar uma instancia do postgres na porta **5432**. Se esta porta já estiver em uso, talvez você tenha algum problema. Certifique-se de que ela também está disponivel.

## Testes
Nossa aplicação conta com testes unitarios para suas principais funcionalidades.

Para rodar os testes, **certifique-se de criar uma database chamada "hacka_wms_tests"**.

Em seguida, use o seguinte comando:
```shell
yarn test OU npm run test
```

## Outras observaçōes
Você pode observar os logs da aplicação com o seguinte comando:
```shell
docker-compose logs hacka_wms -f
```
