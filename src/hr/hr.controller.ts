import {
  Controller,
  Post,
  Body,
  UseGuards,
  Inject,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HrService } from './hr.service';
import { AddHrDto } from './dto/add-hr.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../student/interfaces/user';
import { RoleGuard } from '../auth/role.guard';
import { StudentService } from 'src/student/student.service';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../student/entities/user.entity';

@Controller('hr')
export class HrController {
  constructor(
    private readonly hrService: HrService,
    @Inject(StudentService) private readonly studentService: StudentService,
  ) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post()
  create(@Body() newHr: AddHrDto) {
    return this.hrService.addHr(newHr);
  }

  @Roles(Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch('add-student')
  addStudent(@UserObj() hr: User, @Body() student: { email: string }) {
    return this.hrService.addStudent(student.email, hr);
  }

  @Roles(Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch('remove-student')
  removeStudent(@UserObj() hr: User, @Body() student: { email: string }) {
    return this.hrService.removeStudent(student.email, hr);
  }

  @Roles(Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch('hire-student')
  hireStudent(@UserObj() hr: User, @Body() student: { email: string }) {
    return this.hrService.hireStudent(student.email, hr);
  }
}
