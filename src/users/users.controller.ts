import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('')
  async createUser(@Body() dto: UsersDto) {
    const createUser = await this.usersService.createUser(dto);

    return createUser;
  }

  @Get('')
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();

    if (!Boolean(users.length)) {
      throw new NotFoundException(`Not found any users in the db`);
    }

    return users;
  }

  @Get('byRole/:role')
  async findByRole(@Param('role') role: string) {
    const users = await this.usersService.getUsersByRole(role);
    if (!Boolean(users.length)) {
      throw new NotFoundException(`No users found with role: ${role}`);
    }

    return users;
  }

  @Patch(':id')
  async updateUserById(@Param('id') id: string, @Body() dto: UsersDto) {
    try {
      const parseId = parseInt(id);

      const updatedUserById = await this.usersService.updateDataUserById(
        parseId,
        dto,
      );

      return updatedUserById;
    } catch (error) {
      if (error instanceof NotFoundException)
        throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    try {
      const parseId = parseInt(id);
      await this.usersService.deleteUserById(parseId);

      return { message: `User deleted successfully by ID ${id}` };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
    }
  }
}
