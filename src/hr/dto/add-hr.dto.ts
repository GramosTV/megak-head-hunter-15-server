import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class AddHrDto {
  @IsEmail()
  @MinLength(3, {
    message: 'Email is too short',
  })
  @MaxLength(255, {
    message: 'Email is too long',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsInt()
  @Min(1)
  @Max(999)
  maxReservedStudents: number;
}
