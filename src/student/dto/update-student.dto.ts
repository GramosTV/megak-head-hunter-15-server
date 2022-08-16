import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import {
  BoolValues,
  ExpectedContractType,
  ExpectedTypeWork,
} from '../../../types';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsString()
  @IsNotEmpty({
    message: 'Musisz wprowadzić adres email!',
  })
  @IsEmail()
  @MinLength(3, {
    message: 'Wprowadzony adres email jest za krótki!',
  })
  @MaxLength(255, {
    message: 'Wprowadzony adres email nie może mieć więcej niż 255 znaków!!',
  })
  email: string;

  @IsOptional()
  @Matches(/^[\+\(\s.\-\/\d\)]{5,15}$/, {
    message: 'Wprowadź prawidłowy numer telefonu - maksymalnie 15 znaków',
  })
  @MaxLength(15, {
    message: 'Numer telefonu może mieć maksymalnie 15 znaków',
  })
  tel: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  githubUsername: string;

  @IsOptional()
  @IsArray()
  portfolioUrls: string[] | null;

  // @IsArray()
  // @IsNotEmpty()
  // projectUrls: string[] | null;

  @IsOptional()
  @IsString()
  bio: string;

  @IsNotEmpty()
  @IsEnum(ExpectedTypeWork)
  expectedTypeWork: ExpectedTypeWork;

  @IsString()
  @IsOptional()
  targetWorkCity: string;

  @IsEnum(ExpectedContractType)
  expectedContractType: ExpectedContractType;

  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 0,
  })
  @Min(0)
  @Max(99999)
  expectedSalary: number | null;

  @IsEnum(BoolValues)
  canTakeApprenticeship: BoolValues;

  @IsNumber({
    maxDecimalPlaces: 0,
  })
  @Min(0)
  @Max(99)
  monthsOfCommercialExp: number;

  @IsString()
  @IsOptional()
  education: string | null;

  @IsString()
  @IsOptional()
  workExperience: string | null;

  @IsString()
  @IsOptional()
  courses: string | null;
}
