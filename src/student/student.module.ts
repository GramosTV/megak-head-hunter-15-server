import { User } from 'src/student/entities/user.entity';
import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
