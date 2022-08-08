import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStudentDto {
  @IsEmail()
  @MinLength(3, {
    message: 'Email is too short',
  })
  @MaxLength(255, {
    message: 'Email is too long',
  })
  email: string;

  @IsInt()
  @Min(0)
  @Max(5)
  courseCompletion: number;

  @IsInt()
  @Min(0)
  @Max(5)
  courseEngagement: number;

  @IsInt()
  @Min(0)
  @Max(5)
  projectDegree: number;

  @IsInt()
  @Min(0)
  @Max(5)
  teamProjectDegree: number;

  @IsOptional()
  bonusProjectUrls: string[] | null;
}

export class ArrayOfStudentsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStudentDto)
  students: CreateStudentDto[];
}
