import { Inject, Injectable } from '@nestjs/common';
import { AddHrDto } from './dto/add-hr.dto';
import { AddHrResponse } from '../student/interfaces/add-hr';
import { User } from 'src/student/entities/user.entity';
import { HrInterface, Role } from '../student/interfaces/user';
import { MailService } from '../mail/mail.service';
import { hireInformationMailTemplate } from '../templates/email/student-hired-info-mail';
import { Status } from 'types';
import { HrToStudent } from '../student/entities/hr-to-student.entity';
import { NotEquals } from 'class-validator';

@Injectable()
export class HrService {
  constructor(
    @Inject(MailService)
    private mailService: MailService,
  ) {}

  async checkIfEmailIsUnique(email: string): Promise<boolean> {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return !!user;
  }

  async checkTheNumberOfActualChosenStudents(id: string): Promise<number> {
    return await HrToStudent.count({
      relations: {
        hr: true,
      },
      where: {
        hr: {
          id,
        },
      },
    });
  }

  async addHr(newHr: AddHrDto): Promise<AddHrResponse> {
    const { email, fullName, company, maxReservedStudents } = newHr;
    if (await this.checkIfEmailIsUnique(email)) {
      return {
        ok: false,
        message: 'Konto o podanym adresie email już istnieje!',
      };
    }

    const hr: HrInterface = new User();

    hr.email = email;
    hr.fullName = fullName;
    hr.company = company;
    hr.maxReservedStudents = maxReservedStudents;
    hr.role = Role.HR;

    await hr.save();

    return {
      ok: true,
      message: 'Konto HR zostało utworzone!',
      email: hr.email,
      company: hr.company,
      fullName: hr.fullName,
    };
  }

  async addStudent(studentEmail: string, hr: User) {
    const theExistingCallBetweenParts = await HrToStudent.findOne({
      relations: {
        hr: true,
        student: true,
      },
      where: {
        student: {
          email: studentEmail,
        },
        hr: {
          id: hr.id,
        },
      },
    });
    const studentToAdd = await User.findOne({
      where: {
        email: studentEmail,
      },
    });
    if (!studentToAdd)
      return {
        ok: false,
        message: 'Konto o wybranym adresie e-mail nie istnieje!',
      };
    if (theExistingCallBetweenParts)
      return {
        ok: false,
        message: 'Ten kursant został już przez Ciebie dodany do rozmowy!',
      };
    if (studentToAdd.status !== Status.AVAILABLE)
      return { ok: false, message: 'Kursant nie jest dostępny do rozmowy!' };
    if (
      hr.maxReservedStudents ===
      (await this.checkTheNumberOfActualChosenStudents(hr.id))
    )
      return {
        ok: false,
        message: `Nie możesz wybrać do rozmowy więcej niż ${hr.maxReservedStudents} kursantów jednocześnie!`,
      };
    const newCall = new HrToStudent();
    newCall.hr = hr;
    newCall.student = studentToAdd;
    newCall.reservedTo = new Date(
      new Date().getTime() + 10 * 24 * 60 * 60 * 1000,
    );
    await newCall.save();
    return {
      ok: true,
      message: `Dodano kursanta do rozmowy!`,
    };
  }

  async removeStudent(studentEmail: string, hr: User) {
    const studentToRemove = await User.findOne({
      where: {
        email: studentEmail,
      },
    });
    const callToRemove = await HrToStudent.findOne({
      relations: {
        hr: true,
        student: true,
      },
      where: {
        student: {
          email: studentEmail,
        },
        hr: {
          id: hr.id,
        },
      },
    });
    if (!studentToRemove)
      return {
        ok: false,
        message: 'Konto o wybranym adresie e-mail nie istnieje!',
      };
    if (!callToRemove)
      return {
        ok: false,
        message: 'Ten kursant nie został przez Ciebie dodany do rozmowy!',
      };
    if (studentToRemove.status === Status.HIRED)
      return { ok: false, message: 'Ten kursant jest już zatrudniony!' };
    await callToRemove.remove();
    return {
      ok: true,
      message: `Usunięto kursanta z listy do rozmowy!`,
    };
  }

  async hireStudent(studentEmail: string, hr: User) {
    const studentToHire = await User.findOne({
      where: {
        email: studentEmail,
      },
    });
    const studentToHireAndHrCall = await HrToStudent.findOne({
      relations: {
        hr: true,
        student: true,
      },
      where: {
        student: {
          email: studentEmail,
        },
        hr: {
          id: hr.id,
        },
      },
    });
    if (!studentToHire)
      return {
        ok: false,
        message: 'Konto o wybranym adresie e-mail nie istnieje!',
      };
    if (studentToHire.status === Status.HIRED)
      return { ok: false, message: 'Kursant jest już zatrudniony!' };
    if (!studentToHireAndHrCall)
      return {
        ok: false,
        message: 'Musisz najpierw dodać kursanta do rozmowy żeby go zatrudnić!',
      };
    studentToHire.status = Status.HIRED;
    await studentToHire.save();
    await HrToStudent.delete({
      student: {
        id: studentToHire.id,
      },
    });
    const admin = await User.findOne({
      select: {
        email: true,
      },
      where: {
        role: Role.ADMIN,
      },
    });
    await this.mailService.sendMail(
      admin.email,
      'Kursant został zatrudniony!',
      hireInformationMailTemplate(hr, studentToHire),
    );
    return {
      ok: true,
      message: `Zatrudniono kursanta!`,
    };
  }
}
