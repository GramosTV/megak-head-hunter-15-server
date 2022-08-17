import { User } from '../../student/entities/user.entity';
import * as striptags from 'striptags';

export function hireInformationMailTemplate(hr: User, student: User) {
  return `
    <h1>${striptags(student.firstName)} ${striptags(
    student.lastName,
  )} został właśnie zatrudniony!</h1> 
    <br /> 
    <p>${striptags(student.firstName)} ${striptags(
    student.lastName,
  )} (id: ${striptags(student.id)}, email: ${striptags(
    student.email
  )}) został właśnie zatrudniony przez ${striptags(hr.fullName)} z ${striptags(
    hr.company
  )} (id: ${striptags(hr.id)})!</p>
    `;
}
