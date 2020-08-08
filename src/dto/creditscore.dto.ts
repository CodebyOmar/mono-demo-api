import { IsString, IsEmail, IsNumber } from 'class-validator'

export class CreditScoreDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  amount: number;

  @IsString()
  monoId: string;
}