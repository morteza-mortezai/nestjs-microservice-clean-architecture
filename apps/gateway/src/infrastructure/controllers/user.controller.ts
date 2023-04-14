import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  getUserById(): string {
    return this.userService.getHello();
  }
}
