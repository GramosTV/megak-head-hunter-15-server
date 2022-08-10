import { FilterSettings, GetPaginatedListOfUser, Status } from 'types';
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Role } from './interfaces/user';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async changePassword(user: User, password: string) {
    user.password = await bcrypt.hash(password, 10);
    await User.save(user);
  }

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async getFilteredStudents(
    perPage: number,
    currentPage = 1,
    filterSettings: FilterSettings,
    status: Status,
  ): Promise<GetPaginatedListOfUser> {
    const {
      courseCompletion,
      courseEngagement,
      projectDegree,
      teamProjectDegree,
      expectedTypeWork,
      expectedContractType,
      minNetSalary,
      maxNetSalary,
      canTakeApprenticeship,
      monthsOfCommercialExp,
    } = filterSettings;

    const maxPerPage = perPage;

    const [users, count] = await User.findAndCount({
      relations: {
        hr: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        tel: true,
        githubUsername: true,
        portfolioUrls: true,
        bonusProjectUrls: true,
        bio: true,
        expectedTypeWork: true,
        targetWorkCity: true,
        expectedContractType: true,
        expectedSalary: true,
        canTakeApprenticeship: true,
        monthsOfCommercialExp: true,
        education: true,
        workExperience: true,
        courses: true,
        courseWork: true,
        courseCompletion: true,
        courseEngagement: true,
        projectDegree: true,
        teamProjectDegree: true,
        hr: {
          email: true,
        },
        status: true,
        reservedTo: true,
      },
      where: {
        status,
        courseCompletion,
        courseEngagement,
        projectDegree,
        teamProjectDegree,
        expectedTypeWork,
        expectedContractType,
        expectedSalary:
          Between(minNetSalary || 0, maxNetSalary || 10000000) || null, //@ToDo change to specific number
        canTakeApprenticeship,
        monthsOfCommercialExp,
        role: Role.STUDENT,
      },
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const pagesCount = Math.ceil(count / maxPerPage);

    return {
      users,
      pagesCount,
    };
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
