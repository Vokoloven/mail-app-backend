import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('users')
  createUser() {
    return this.usersService.createUser();
  }
}
