import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ExpectedTypeWork, ExpectedContractType } from 'types';

export class EditProfileDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(999999999999999)
  tel: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  firstName: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  lastName: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(39)
  githubUsername: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(999, { each: true })
  portfolioUrls: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(999, { each: true })
  bonusProjectUrls: string[];

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  bio: string;

  @IsOptional()
  @IsEnum(ExpectedTypeWork)
  expectedTypeWork: ExpectedTypeWork;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(189)
  targetWorkCity: string;

  @IsOptional()
  @IsEnum(ExpectedContractType)
  expectedContractType: ExpectedContractType;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  expectedSalary: number;

  @IsOptional()
  @IsBoolean()
  canTakeApprenticeship: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99)
  monthsOfCommercialExp: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  education: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  workExperience: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  courses: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @MaxLength(999, { each: true })
  courseWork: string[];
}
