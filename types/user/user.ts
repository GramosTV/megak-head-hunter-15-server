import { Role } from '../../src/student/interfaces/user';

export enum ExpectedTypeWork {
  Local = 'Biuro',
  ReadyToMove = 'Gotowy do przeprowadzki',
  Remote = 'Zdalna',
  Hybrid = 'Biuro i zdalna',
  All = 'Dowolone',
}

export enum ExpectedContractType {
  EmploymentContract = 'Umowa o pracę',
  B2B = 'B2B',
  CommissionContract = 'Zlecenie',
  NoPreferences = 'Umowa o dzieło',
}

export enum Status {
  AVAILABLE = 'available',
  RESERVED = 'reserved',
  HIRED = 'hired',
}

export enum Score {
  zero,
  one,
  two,
  three,
  four,
  five,
}

export enum BoolValues {
  TRUE = 'true',
  FALSE = 'false',
}

export interface AuthUser {
  ok: true;
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  role: Role;
  ghUsername: string | null;
  maxReservedStudents: number | null;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  tel: number;
  githubUsername: string;
  portfolioUrls: string[];
  bonusProjectUrls: string[];
  bio: string;
  expectedTypeWork: ExpectedTypeWork;
  targetWorkCity: string;
  expectedContractType: ExpectedContractType;
  expectedSalary: number;
  canTakeApprenticeship: BoolValues;
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string;
  courses: string;
  courseWork: string[];
  courseCompletion: number;
  courseEngagement: number;
  projectDegree: number;
  teamProjectDegree: number;
  hr: {
    email: string;
  };
  status: Status;
  reservedTo: Date;
}

export interface GetPaginatedListOfUser {
  users: User[];
  pagesCount: number;
}
