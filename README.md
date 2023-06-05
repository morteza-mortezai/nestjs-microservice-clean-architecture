<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Payever Test</p>
   


## Description

this project is hybrid appilication ,

every microservices can work independently and also as a part of microservice application .

there is gateway that act as http proxy and map client request to microservice .

and also every microservices can listen to http request .

it is consist of three microservices ,*Gateway* ,*Users* and *Mailer* 

they communicate each other throug rabbitMq .

there is also **lib** folder that contains common modules .

## architecture
clean architecture is used for this project 

it is consist of three main layer ; **Domain** , **Usecase** and **Infrastucture** .

accroding to clean architecture rules domain layer should not depend on any thing .

and also usecase layer can just depend on domain layer

Infrastructure layer is where controller and other services are there .

![2](https://github.com/morteza-mortezai/nestjs-microservice-clean-architecture/assets/75200938/0c7e56de-9aab-4d77-b15d-821befc1f6d6)

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
