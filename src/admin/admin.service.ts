import { User } from './../student/entities/user.entity';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentDto } from 'src/student/dto/create-student.dto';
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

  addStudents(createStudentsDtos: CreateStudentDto[]) {
    createStudentsDtos.map((e) => {
      User.save(e);
    });
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
