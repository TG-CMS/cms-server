import { IsEmail, IsNotEmpty, IsEmpty } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
export class RegisterSchema {
  @IsNotEmpty()
  password!: string;
  @IsNotEmpty()
  username: string;
  // @IsEmpty()
  // referralCode: string;
}

export class LoginSchema extends PickType(RegisterSchema, [
  'username',
  'password',
] as const) {}
