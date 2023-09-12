# Eventos de auditoria do Keycloak
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

### Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Eventos de auditoria do painel administrativo do Keycloak
### ID do evento de auditoria
"id"

### Tipo de recurso que está sendo alterado ( USER somente por enquanto )
"resourceType"

### ID do conteúdo alterado
"resourcePath"

### ID do usuário que realizou a operação
"authUserId"

### Tipo de operação realizada
"operationType"

### Realm ao qual o conteúdo pertence
"realmId"

### Milesegundos da operação realizada (timestamp * 1000 = Data atual)
"adminEventTime"

### Conteúdo alterado
"representation"
