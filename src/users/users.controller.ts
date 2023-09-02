import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto';

@Controller('/')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('users')
  async createUser(@Body() dto: UsersDto) {
    const createUser = await this.usersService.createUser(dto);

    return createUser;
  }

  @Get('users')
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();

    return users;
  }
}
