import { BaseEntity } from 'typeorm';
import { User } from '../../../types';

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

export interface GetPaginatedListOfUser {
  users: User[];
  pagesCount: number;
}
