import { Role } from '../../src/student/interfaces/user';

export interface AuthUser {
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  role: Role;
  ghUsername: string | null;
  maxReservedStudents: number | null;
}
