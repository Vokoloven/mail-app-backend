import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

enum State {
  MALE = 'male',
  FEMALE = 'female',
}

export class UsersDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: 'admin' | 'user';

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(State)
  @IsNotEmpty()
  state: 'male' | 'female';
}
