# Estrutura base de uma API em Serverless

Este repo é utilizado para experimentos e testes práticos com devs, seu uso deve ser em ambiente de desenvolvimento pois o mesmo não está otimizado para produção.

## Instalação

Após clonar este repo você deve:
- Configurar o arquivo `.env` para setar a URL do seu banco de dados em `DATABASE_URL`
- Instalar todas as dependências do projeto executando `npm install`
- Rodar o teste para validar se a instalação foi bem sucedida com o comando `npm test`
- Rodar a API local executando `npm start`

Se seus testes passaram e a api está ONLINE, significa que você está pronto para codar.


## Usando a API

Após executar a API você deverá ver as rotas que sua API tem até o momento, vamos executar o CRUD que já vem com a API para aprender a utilizar suas rotas.

> Recomendamos usar um client de API REST como Postman ou Insominia.


```js
   ┌────────────────────────────────────────────────────────────────────────────────┐
   │                                                                                │
   │   ANY | http://localhost:3000/local/health-check                               │
   │   POST | http://localhost:3000/2015-03-31/functions/health-check/invocations   │
   │   ANY | http://localhost:3000/local/health-check/{proxy*}                      │
   │   POST | http://localhost:3000/2015-03-31/functions/health-check/invocations   │
   │   ANY | http://localhost:3000/local/users                                      │
   │   POST | http://localhost:3000/2015-03-31/functions/user/invocations           │
   │   ANY | http://localhost:3000/local/users/{proxy*}                             │
   │   POST | http://localhost:3000/2015-03-31/functions/user/invocations           │
   │   ANY | http://localhost:3000/local/auth                                       │
   │   POST | http://localhost:3000/2015-03-31/functions/auth/invocations           │
   │   ANY | http://localhost:3000/local/auth/{proxy*}                              │
   │   POST | http://localhost:3000/2015-03-31/functions/auth/invocations           │
   │   ANY | http://localhost:3000/local/apps                                       │
   │   POST | http://localhost:3000/2015-03-31/functions/apps/invocations           │
   │   ANY | http://localhost:3000/local/apps/{proxy*}                              │
   │   POST | http://localhost:3000/2015-03-31/functions/apps/invocations           │
   │                                                                                │
   └────────────────────────────────────────────────────────────────────────────────┘
```
Se for a primeira vez que você está executando essa API você deve estar com seu banco de dados limpo e sem usuário para logar, então vamos primeiro criar um user novo e depois fazer o login:

1) POST na rota /users passando no mínimo `{ "email": "user@email.com", "name": "User x", "password": "@123" }`
2) POST na rota /auth passando email e senha criado anteriormente

Perceba que ao efetuar o login você receberá um token:


```
{
    "user": {
        "_id": "659464fca77de06b5e75c293",
        "name": "User do name aqui ",
        "email": "user@email.com",
        "createdAt": "2024-01-02T19:33:16.402Z",
        "updatedAt": "2024-01-02T19:33:16.402Z",
        "__v": 0,
        "id": "659464fca77de06b5e75c293"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjU5NDY0ZmNhNzdkZTA2YjVlNzVjMjkzIiwiaWF0IjoxNzA0MjI0MTE1fQ.-_XkdHE8SkOUgEL0eiG-vNgSnznZHp5t6o7j0PtZCMw"
}
```

Com este token (JWT) você terá acesso as demais rotas que exige autenticação.

## Agora vamos testar o CRUD de `apps`

Antes vamos ver o model de app para você conhecer os campos que podem ser salvos:
```
{
  name: {
    type: String,
    required: [true, 'name']
  },
  description: {
    type: String
  },
  photo: {
    type: String,
    required: [true, 'photo']
  },
  rating: {
    type: Number,
    default: 0
  },
  totalRating: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: AppStatusEnum,
    default: AppStatusEnum.DRAFT
  }
}
```

E por fim você pode testar as rotas do crud de apps:

- POST `/apps` criará um novo app
- GET `/apps` irá retornar todos os apps salvos
- GET `/apps?search="xyz"&page=1&perPage=50` Exemplo de pesquisa de app com o nome `xyz`
- GET `/apps/_idDoApp` retorna um determinado app pelo seu _id
- PUT `/apps` edita um app
- DELETE `/apps` excluiu um app


## Estrutura da API

Vamos entender melhor a estrutura dos arquivos, para isso vamos simular que vamos criar um CRUD de cadastro de clientes, para isso vamos definir duas coisas:
- Nome do serviço: `client`
- Rota do serviço: `/clientes`

Para você criar uma nova rota é necessário entender a estrutura base da API, tudo começa com o registro do serviço em serverless.yml na sessão `functions`:


```yml
functions:
  health-check: ${file(src/handlers/healthCheck/service.yml)} 
  user: ${file(src/handlers/user/service.yml)}
  auth: ${file(src/handlers/auth/service.yml)}
  apps: ${file(src/handlers/apps/service.yml)}
  client: ${file(src/handlers/client/service.yml)}
```
Perceba que na ultima linha desse bloco inserimos o service client apontando para um arquivo `service.yml`, então vamos ver como fica este arquivo:

```yml
handler: src/handlers/client/handler.main
package:
    individually: true
events:
  - http:
      path: /clients
      method: any
      cors: true
  - http:
      path: /clients/{proxy+}
      method: any
      cors: true
```

Este arquivo é o responsável por registrar as rotas para este serviço, e o mesmo é direcionado para o handler.main, no caso o arquivo `handler.ts`:

```javascript
import { auth } from '@/lib/auth'
import { buildRouter, buildHandler } from '@/lib/router'
import { createClient } from './createClient'
import { removeClient } from './deleteClient'
import { getClient } from './getClient'
import { listClients } from './listClients'
import { updateClient } from './updateClient'

const router = buildRouter()

router.post('/clients', auth.verifyLogged(createClient))
router.get('/clients/{clientId}', auth.verifyLogged(getClient))
router.put('/clients', auth.verifyLogged(updateClient))
router.get('/clients', auth.verifyLogged(listClients))
router.delete('/clients/{clientId}', auth.verifyLogged(removeClient))

const main = buildHandler(router)

export {
  main
}

``` 

Para cara ação do crud (criar, editar, etc) é apontado para um arquivo.

Vamos ver como ficaria apenas o criar desse crud que é um POST em `/clients`, no caso o `createClient`:

```javascript
import { clientService } from './clientService'

const createClient = async ({ body, user }) => {
  const client = await clientService.create(body, user)

  return { client }
}

export {
  createClient
}

```

Este arquivo é utilizado apenas para fazer o papel de um controlador, organizando as variáveis de entreda e chamando de fato onde as regras estão, que é o `clientService`:

```javascript
import { error } from '@/lib/error'
import { Client } from '@/models/clientModel'
import { IUser } from '@/types/IUser'
import { IClient } from '@/types/IClient'
import { logService } from '../log/logService'
import { clientErrors } from './clientErrors'

const create = async (data: IClient, user: IUser) => {
  const client = await Client.create(data)

  await logService.create({
    user: user._id,
    event: 'Criar cliente',
    detail: `Cliente com id ${client._id} criado com sucesso!`
  })

  return client
}
......
```

Neste arquivo estão todos os métodos com suas devidas lógicas para criar, alterar, editar, procurar, excluir e demais rotas necessárias para manipular clientes.

Veja em vídeo: 

[![Estrutura base de uma API em Serverless
](https://img.youtube.com/vi/9UCG7mkLDiU/0.jpg)](https://www.youtube.com/watch?v=9UCG7mkLDiU)


## License

[MIT](https://choosealicense.com/licenses/mit/)
