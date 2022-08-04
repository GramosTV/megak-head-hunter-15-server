import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../student/entities/user.entity';
import { MailModule } from 'src/mail/mail.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), MailModule, StudentModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
