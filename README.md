<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">NestJS Microservice Project with RabbitMQ Integration
</p>
   


## Description

this project is consist of three microservices ,*Gateway* ,*Users* and *Mailer* 

they communicate each other throug rabbitMq .

there is also **lib** folder that contains common modules .

client request is recived by gateway and after validation, it is sent to related microservice and then result will be sent back .

This project has been designed with scalability in mind, allowing for easy addition of new services and the ability to handle large volumes of traffic. It also offers flexibility in deployment options, with the ability to deploy each service separately or together as a single unit.

If you are looking for a robust, scalable, and flexible microservice architecture for your API service, this project is the perfect solution.

![1](https://github.com/morteza-mortezai/nestjs-microservice-clean-architecture/assets/75200938/875f23fb-8fef-4e1f-9a5d-546b3af29673)
## architecture
clean architecture is used for this project 

it is consist of three main layer ; **Domain** , **Usecase** and **Infrastucture** .


accroding to clean architecture rules domain layer should not depend on any thing .

and also usecase layer can just depend on domain layer

Infrastructure layer is where controller and other services are there .

![2](https://github.com/morteza-mortezai/nestjs-microservice-clean-architecture/assets/75200938/0c7e56de-9aab-4d77-b15d-821befc1f6d6)

## endpoints
post: localhost:3001/api/users
get: localhost:3001/api/user/:id
get : localhost:3000/api/user/:id/avatar
delete : localhost:3000/api/user/:id/avatar

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
