import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async changePassword(user: User, password: string) {
    const pw = await bcrypt.hash(password, 10);
    user.password = pw;
    await User.save(user);
  }

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: string) {
    return `This action returns a #${id} student`;
  }

  update(id: string, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: string) {
    return `This action removes a #${id} student`;
  }
}
