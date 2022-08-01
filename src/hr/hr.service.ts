import { Injectable } from '@nestjs/common';
import { AddHrDto } from './dto/add-hr.dto';
import { AddHrResponse } from '../student/interfaces/add-hr';
import { User } from 'src/student/entities/user.entity';
import { HrInterface, Role } from '../student/interfaces/user';

@Injectable()
export class HrService {
  async checkIfEmailIsUnique(email: string): Promise<boolean> {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    return !!user;
  }

  async addHr(newHr: AddHrDto): Promise<AddHrResponse> {
    const { email, fullName, company, maxReservedStudents } = newHr;
    if (await this.checkIfEmailIsUnique(email)) {
      return {
        ok: false,
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
      email: hr.email,
      company: hr.company,
      fullName: hr.fullName,
    };
  }
}
