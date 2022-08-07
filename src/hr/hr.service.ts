import { Inject, Injectable } from '@nestjs/common';
import { AddHrDto } from './dto/add-hr.dto';
import { AddHrResponse } from '../student/interfaces/add-hr';
import { User } from 'src/student/entities/user.entity';
import { HrInterface, Role } from '../student/interfaces/user';
import { MailService } from '../mail/mail.service';
import { hireInformationMailTemplate } from '../templates/email/student-hired-info-mail';
import { Status } from 'types';

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
    return await User.count({
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
    studentToAdd.hr = hr;
    studentToAdd.status = Status.RESERVED;
    studentToAdd.reservedTo = new Date(
      new Date().getTime() + 10 * 24 * 60 * 60 * 1000,
    );
    await studentToAdd.save();
    return {
      ok: true,
      message: `Dodano kursanta do rozmowy!`,
    };
  }

  async removeStudent(studentEmail: string, hr: User) {
    const studentToRemove = await User.findOne({
      relations: {
        hr: true,
      },
      where: {
        email: studentEmail,
      },
    });
    if (!studentToRemove)
      return {
        ok: false,
        message: 'Konto o wybranym adresie e-mail nie istnieje!',
      };
    if (!studentToRemove.hr || studentToRemove.hr.id !== hr.id)
      return {
        ok: false,
        message: 'Ten kursant nie został przez Ciebie dodany do rozmowy!',
      };
    if (studentToRemove.status === Status.HIRED)
      return { ok: false, message: 'Ten kursant jest już zatrudniony!' };
    studentToRemove.hr = null;
    studentToRemove.status = Status.AVAILABLE;
    studentToRemove.reservedTo = null;
    await studentToRemove.save();
    return {
      ok: true,
      message: `Usunięto kursanta z listy do rozmowy!`,
    };
  }

  async hireStudent(studentEmail: string, hr: User) {
    const studentToHire = await User.findOne({
      relations: {
        hr: true,
      },
      where: {
        email: studentEmail,
      },
    });
    if (!studentToHire)
      return {
        ok: false,
        message: 'Konto o wybranym adresie e-mail nie istnieje!',
      };
    if (studentToHire.status === Status.HIRED)
      return { ok: false, message: 'Kursant jest już zatrudniony!' };
    if (studentToHire.status === Status.AVAILABLE)
      return {
        ok: false,
        message: 'Musisz najpierw dodać kursanta do rozmowy żeby go zatrudnić!',
      };
    if (studentToHire.hr.id !== hr.id)
      return {
        ok: false,
        message:
          'Ten kursant został dodany do rozmowy przez inny HR! Nie możesz teraz go zatrudnić!',
      };
    studentToHire.status = Status.HIRED;
    studentToHire.reservedTo = null;
    await studentToHire.save();
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
