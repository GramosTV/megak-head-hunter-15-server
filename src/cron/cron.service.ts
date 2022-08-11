import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LessThan } from 'typeorm';
import { HrToStudent } from '../student/entities/hr-to-student.entity';

@Injectable()
export class CronService {
  @Cron('0 0 0 * * *', {
    name: 'Reset students status',
  })
  async resetStudentsStatus() {
    const currentDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    await HrToStudent.delete({
      reservedTo: LessThan(currentDate),
    });
  }
}
