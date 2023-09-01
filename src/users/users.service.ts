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
      },
    });

    const profile = await this.prisma.profile.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        state: dto.state,
      },
    });

    return { user, profile };
  }
}
