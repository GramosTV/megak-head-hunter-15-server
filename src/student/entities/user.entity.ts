import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import {
  ExpectedContractType,
  ExpectedTypeWork,
  Role,
} from '../interfaces/user';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    width: 255,
    type: 'text',
    nullable: false,
  })
  email: string;

  @Column({
    width: 255,
    type: 'text',
    nullable: true,
  })
  password: string;

  @Column({
    width: 15,
    type: 'tinyint',
    nullable: true,
  })
  tel: number | null;

  @Column({
    width: 255,
    type: 'text',
    nullable: true,
  })
  firstName: true;

  @Column({
    width: 128,
    type: 'text',
    nullable: true,
  })
  lastName: string;

  @Column({
    width: 39,
    type: 'text',
    nullable: true,
  })
  githubUsername: string;

  @Column({
    width: 2000,
    type: 'text',
    nullable: true,
  })
  portfolioUrls: string | null;

  @Column({
    width: 2000,
    type: 'text',
    nullable: true,
  })
  projectUrls: string;

  @Column({
    width: 250,
    type: 'text',
    nullable: true,
  })
  bio: string | null;

  @Column({
    type: 'enum',
    enum: ExpectedTypeWork,
    nullable: true,
  })
  expectedTypeWork: ExpectedTypeWork;

  @Column({
    width: 189,
    type: 'text',
    nullable: true,
  })
  targetWorkCity: string | null;

  @Column({
    type: 'enum',
    enum: ExpectedContractType,
    nullable: true,
  })
  expectedContractType: ExpectedContractType;

  @Column({
    width: 5,
    type: 'tinyint',
    nullable: true,
  })
  expectedSalary: null | number;

  @Column({
    default: false,
    type: 'boolean',
    nullable: true,
  })
  canTakeApprenticeship: boolean;

  @Column({
    width: 2,
    type: 'tinyint',
    nullable: true,
  })
  monthsOfCommercialExp: number;

  @Column({
    width: 2000,
    type: 'text',
    nullable: true,
  })
  education: string | null;

  @Column({
    width: 2000,
    type: 'text',
    nullable: true,
  })
  workExperience: string | null;

  @Column({
    width: 2000,
    type: 'text',
    nullable: true,
  })
  courses: string | null;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
  })
  role: Role;

  //HR-only fields

  @Column({
    width: 384,
    type: 'text',
    nullable: true,
  })
  fullName: string;

  @Column({
    width: 160,
    type: 'text',
    nullable: true,
  })
  company: string;

  @Column({
    width: 3,
    type: 'tinyint',
    nullable: true,
  })
  maxReservedStudents: number;
}
