import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  NotFoundException,
} from '@nestjs/common';
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

  @Get('users/byRole/:role')
  async findByRole(@Param('role') role: string) {
    const users = await this.usersService.getUsersByRole(role);

    return users;
  }

  @Patch('users/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() dto: Partial<UsersDto>,
  ) {
    try {
      const parseId = parseInt(id);

      const updatedUserById = await this.usersService.updateDataUserById(
        parseId,
        dto,
      );

      return updatedUserById;
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message);
    }
  }
}
