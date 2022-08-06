import { User } from '../../student/entities/user.entity';

export function hireInformationMailTemplate(hr: User, student: User) {
  return `
    <h1>Student ${student.firstName} ${student.lastName} has been hired!</h1> 
    <br /> 
    <p>${student.firstName} ${student.lastName} (id: ${student.id}, email: ${student.email}) has just been hired by ${hr.fullName} from ${hr.company}! (id: ${hr.id})</p>
    `;
}
