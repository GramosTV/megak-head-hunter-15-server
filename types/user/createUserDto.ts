import {
  IsEmail,
  IsInt,
  IsOptional,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Score } from './user';

export class CreateUserDto {
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
  courseCompletion: Score;

  @IsInt()
  @Min(0)
  @Max(5)
  courseEngagement: Score;

  @IsInt()
  @Min(0)
  @Max(5)
  projectDegree: Score;

  @IsInt()
  @Min(0)
  @Max(5)
  teamProjectDegree: Score;

  @IsOptional()
  bonusProjectUrls: string[] | null;
}
