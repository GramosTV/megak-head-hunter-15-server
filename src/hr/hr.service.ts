import { Injectable } from '@nestjs/common';
import { AddHrDto } from './dto/add-hr.dto';
import { AddHrResponse } from '../student/interfaces/add-hr';
import { User } from 'src/student/entities/user.entity';

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
  }
}
