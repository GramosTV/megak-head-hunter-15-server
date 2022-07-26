import { BaseEntity } from 'typeorm';

export enum ExpectedTypeWork {
  Local,
  ReadyToMove,
  Remote,
  Hybrid,
  All,
}

export enum ExpectedContractType {
  EmploymentContract,
  B2B,
  CommisionContract,
  NoPreferences,
}

export enum Role {
  STUDENT = 'student',
  HR = 'hr',
  ADMIN = 'admin',
}

export interface HrInterface extends BaseEntity {
  email: string;
  fullName: string;
  company: string;
  maxReservedStudents: number;
}
