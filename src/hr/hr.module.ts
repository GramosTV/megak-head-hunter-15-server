import { Module } from '@nestjs/common';
import { HrService } from './hr.service';
import { HrController } from './hr.controller';
import { MailService } from '../mail/mail.service';

@Module({
  controllers: [HrController],
  providers: [HrService, MailService],
})
export class HrModule {}
