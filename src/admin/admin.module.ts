import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { StudentService } from '../student/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../student/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AdminController],
  providers: [AdminService, StudentService],
})
export class AdminModule {}
