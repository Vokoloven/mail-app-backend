import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: UsersDto) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        role: dto.role,
        profile: {
          create: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            state: dto.state,
          },
        },
      },
    });

    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async getUsersByRole(role: string) {
    const users = await this.prisma.user.findMany({
      where: {
        role,
      },
    });
    return users;
  }

  async updateDataUserById(id: number, dto: Partial<UsersDto>) {
    console.log(dto);
    console.log(id);
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
        role: dto.role,
        username: dto.username,
        profile: {
          update: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            state: dto.state,
          },
        },
      },
    });
    return user;
  }
}
