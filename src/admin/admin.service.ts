import { User } from './../student/entities/user.entity';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ArrayOfStudentsDto,
  CreateStudentDto,
} from 'src/student/dto/create-student.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { StudentService } from 'src/student/student.service';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @Inject(forwardRef(() => StudentService))
    private studentService: StudentService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  async addStudents(createStudentsDtos: ArrayOfStudentsDto) {
    const message = [];
    await Promise.all(
      createStudentsDtos.students.map(async (e: CreateStudentDto) => {
        const mailCheck = await User.findBy({
          email: e.email,
        });
        if (mailCheck.length) {
          message.push(
            `Konto zarejestrowane na adres e-mail: ${mailCheck[0].email} już istnieje!`,
          );
          return;
        }
        const user = new User();
        user.email = e.email;
        user.courseCompletion = e.courseCompletion;
        user.courseEngagement = e.courseEngagement;
        user.projectDegree = e.projectDegree;
        user.teamProjectDegree = e.teamProjectDegree;
        user.bonusProjectUrls = e.bonusProjectUrls;
        await user.save();
        message.push(`Pomyślnie zarejestrowano konto: ${e.email}`);
      }),
    );
    return {
      ok: true,
      message,
    };
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
