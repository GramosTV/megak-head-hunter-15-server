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

export enum Score {
  zero,
  one,
  two,
  three,
  four,
  five,
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
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  education: string;
  workExperience: string;
  courses: string;
  courseWork: string[];
  courseCompletion: Score;
  courseEngagement: Score;
  projectDegree: Score;
  teamProjectDegree: Score;
}

export interface GetPaginatedListOfUser {
  users: User[];
  pagesCount: number;
}
