import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto';

@Controller('/')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('users')
  createUser(@Body() dto: UsersDto) {
    console.log({ dto });

    return this.usersService.createUser(dto);
  }
}
