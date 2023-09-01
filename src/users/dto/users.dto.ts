export class UsersDto {
  username: string;
  email: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
  state: 'male' | 'female';
}
