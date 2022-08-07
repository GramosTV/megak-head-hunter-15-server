import { Module } from '@nestjs/common';
import { HrService } from './hr.service';
import { HrController } from './hr.controller';
import { StudentModule } from 'src/student/student.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [StudentModule],
  controllers: [HrController],
  providers: [HrService, MailService],
})
export class HrModule {}
