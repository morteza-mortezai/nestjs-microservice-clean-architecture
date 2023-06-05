<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Payever Test</p>
   


## Description

this project is consist of three microservices ,*Gateway* ,*Users* and *Mailer* ,
they communicate each other throw rabbitMq .
client request is recived by gateway and after validation, it is send to related microservice and then result will be sent back .

<img src="ORDERING-APP/document/1.png" width="200" alt="Nest Logo" />
## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start gateway
```
then in new terminal
```bash
$ npm run start users
```
then in new terminal
```bash
$ npm run start mailer
```

## Test

```bash
# unit tests
$ npm run test


```

## Support
