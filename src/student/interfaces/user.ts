import { BaseEntity } from 'typeorm';

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
  role: Role;
}
