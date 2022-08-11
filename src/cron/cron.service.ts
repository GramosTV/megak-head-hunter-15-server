import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessThan } from 'typeorm';
import { HrToStudent } from '../student/entities/hr-to-student.entity';

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_10_SECONDS, {
    //'0 0 0 * * *'
    name: 'Reset students status',
  })
  async resetStudentsStatus() {
    const currentDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    console.log(currentDate);
    await HrToStudent.delete({
      reservedTo: LessThan(currentDate),
    });
  }
}
