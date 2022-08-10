import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { User } from '../student/entities/user.entity';
import { LessThan } from 'typeorm';
import { Role } from '../student/interfaces/user';
import { Status } from 'types';

@Injectable()
export class CronService {
  @Cron('0 0 0 * * *', {
    name: 'Reset students status',
  })
  async resetStudentsStatus() {
    const currentDate = new Date();
    const usersToStatusReset = await User.find({
      relations: {
        hr: true,
      },
      where: {
        role: Role.STUDENT,
        reservedTo: LessThan(currentDate),
      },
    });
    if (!usersToStatusReset) return;
    usersToStatusReset.forEach(async (user) => {
      user.status = Status.AVAILABLE;
      user.reservedTo = null;
      user.hr = null;
      await user.save();
    });
  }
}
