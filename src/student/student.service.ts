import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { User } from './entities/user.entity';
import { GetPaginatedListOfUser, Role } from './interfaces/user';

@Injectable()
export class StudentService {
  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async findAll(currentPage = 1): Promise<GetPaginatedListOfUser> {
    const maxPerPage = 3; //@ToDo to change to specific number

    const [users, count] = await User.findAndCount({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        expectedContractType: true,
      },
      where: {
        role: Role.STUDENT,
      },
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const pagesCount = Math.ceil(count / maxPerPage);

    return {
      users: users,
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
