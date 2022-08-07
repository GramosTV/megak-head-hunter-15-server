import { User } from '../../student/entities/user.entity';

export function hireInformationMailTemplate(hr: User, student: User) {
  return `
    <h1>${student.firstName} ${student.lastName} został właśnie zatrudniony!</h1> 
    <br /> 
    <p>${student.firstName} ${student.lastName} (id: ${student.id}, email: ${student.email}) został właśnie zatrudniony przez ${hr.fullName} z ${hr.company} (id: ${hr.id})!</p>
    `;
}
