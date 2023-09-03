import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersDto, UsersPatchDto } from './dto';

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
      include: { profile: true },
    });

    return user;
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      include: { profile: true },
    });

    return users;
  }

  async getUsersByRole(role: string) {
    const users = await this.prisma.user.findMany({
      where: {
        role,
      },
      include: { profile: true },
    });
    return users;
  }

  async updateDataUserById(id: number, dto: UsersPatchDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

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
      include: { profile: true },
    });
    return user;
  }

  async deleteUserById(id: number) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    await this.prisma.profile.deleteMany({
      where: {
        id: existingUser.profileId,
      },
    });

    const deleteUser = await this.prisma.user.delete({
      where: {
        id,
      },
    });

    return deleteUser;
  }
}
