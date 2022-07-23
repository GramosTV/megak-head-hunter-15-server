import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ExpectedContractType, ExpectedTypeWork } from '../interfaces/student';

@Entity()
export class Student extends BaseEntity {
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
    nullable: false,
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
    nullable: false,
  })
  firstName: string;

  @Column({
    width: 128,
    type: 'text',
    nullable: false,
  })
  lastName: string;

  @Column({
    width: 39,
    type: 'text',
    nullable: false,
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
    nullable: false,
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
    nullable: false,
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
    nullable: false,
  })
  canTakeApprenticeship: boolean;

  @Column({
    width: 2,
    type: 'tinyint',
    nullable: false,
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

}
