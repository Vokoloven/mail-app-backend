import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

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
  role: 'admin' | 'user';

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(State)
  state: 'male' | 'female';
}

export class UsersPatchDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsEnum(Role)
  @IsOptional()
  role: 'admin' | 'user';

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName: string;

  @IsEnum(State)
  @IsOptional()
  state: 'male' | 'female';
}
