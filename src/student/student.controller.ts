import { Role } from './interfaces/user';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { User } from './entities/user.entity';
import { EditProfileDto, GetPaginatedListOfUser } from 'types';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get('/:perPage/:pageNumber?')
  findAll(
    @Param('perPage') perPage?: string,
    @Param('pageNumber') pageNumber?: string,
  ): Promise<GetPaginatedListOfUser> {
    return this.studentService.findAll(
      Number(perPage),
      pageNumber ? Number(pageNumber) : 1,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/password')
  async changePassword(
    @UserObj() user: User,
    @Body() { password }: { password: string },
  ) {
    return await this.studentService.changePassword(user, password);
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard('jwt'))
  @Patch('/profile')
  async editProfile(
    @UserObj() user: User,
    @Body() editProfileDto: EditProfileDto,
  ) {
    return await this.studentService.editProfile(user, editProfileDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}
