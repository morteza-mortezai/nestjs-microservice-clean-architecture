<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Payever Test</p>
   


## Description

this project is consist of three microservices ,*Gateway* ,*Users* and *Mailer* 

they communicate each other throug rabbitMq .

client request is recived by gateway and after validation, it is sent to related microservice and then result will be sent back .

![1](https://github.com/morteza-mortezai/nestjs-microservice-clean-architecture/assets/75200938/875f23fb-8fef-4e1f-9a5d-546b3af29673)
## architecture
clean architecture is used for this project 

it is consist of three main layer ; **Domain** , **Usecase** and **Infrastucture** .

accroding to clean architecture rules domain layer should not depend on any thing .

and also usecase layer can just depend on domain layer

Infrastructure layer is where controller and other services are there .

[clean architecture](https://www.mytaskpanel.com/wp-content/uploads/2022/09/blog-consulting18b.jpg)

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
