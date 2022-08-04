import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExpectedContractType, ExpectedTypeWork, Score } from 'types';
import { Role, Status } from '../interfaces/user';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
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
  password: string | null;

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
  firstName: string | null;

  @Column({
    width: 128,
    type: 'text',
    nullable: true,
  })
  lastName: string | null;

  @Column({
    width: 39,
    type: 'text',
    nullable: true,
  })
  githubUsername: string | null;

  @Column({ type: 'simple-array', nullable: true })
  portfolioUrls: string[] | null;

  @Column({ type: 'simple-array', nullable: true })
  bonusProjectUrls: string[] | null;

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
  expectedTypeWork: ExpectedTypeWork | null;

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
  expectedContractType: ExpectedContractType | null;

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
  monthsOfCommercialExp: number | null;

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

  @Column({ type: 'simple-array', nullable: true })
  courseWork: string[] | null;

  @Column({
    type: 'enum',
    enum: Score,
    nullable: true,
  })
  courseCompletion: Score | null;

  @Column({
    type: 'enum',
    enum: Score,
    nullable: true,
  })
  courseEngagement: Score | null;

  @Column({
    type: 'enum',
    enum: Score,
    nullable: true,
  })
  projectDegree: Score | null;

  @Column({
    type: 'enum',
    enum: Score,
    nullable: true,
  })
  teamProjectDegree: Score | null;

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

  @Column({
    type: 'enum',
    enum: Status,
    nullable: false,
    default: Status.AVAILABLE,
  })
  status: Status;

  @Column({
    type: 'date',
    nullable: true,
  })
  reservedTo: Date | null;

  //HR-only fields

  @Column({
    width: 384,
    type: 'text',
    nullable: true,
  })
  fullName: string | null;

  @Column({
    width: 160,
    type: 'text',
    nullable: true,
  })
  company: string | null;

  @Column({
    width: 3,
    type: 'smallint',
    nullable: true,
  })
  maxReservedStudents: number | null;

  //hr - student relation
  @ManyToOne((type) => User, (user) => user.students, { eager: true })
  hr: User;

  @OneToMany((type) => User, (user) => user.hr)
  students: User[];
}
