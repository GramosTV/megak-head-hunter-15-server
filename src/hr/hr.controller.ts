import {
  ExpectedContractType,
  ExpectedTypeWork,
  FilterSettings,
  Score,
} from 'types';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Inject,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HrService } from './hr.service';
import { AddHrDto } from './dto/add-hr.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../student/interfaces/user';
import { RoleGuard } from '../auth/role.guard';
import { StudentService } from 'src/student/student.service';
import { ParseScorePipe } from 'src/pipes/parse-score.pipe';
import { ParseFilterIntPipe } from 'src/pipes/parse-filterInt.pipe';
import { ParseFilterBooleanPipe } from 'src/pipes/parse-filterBoolean.pipe';
import { ParseExpectedContractTypePipe } from 'src/pipes/parse-expectedContractType.pipe';
import { ParseExpectedTypeWorkPipe } from 'src/pipes/parse-expectedTypeWork.pipe';
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
  @Get(
    '/filteredStudents/:courseCompletion/:courseEngagement/:projectDegree/:teamProjectDegree/:expectedTypeWork/:expectedContractType/:minNetSalary/:maxNetSalary/:canTakeApprenticeship/:monthsOfCommercialExperience',
  )
  async getFilteredStudents(
    @Param('courseCompletion', ParseScorePipe) courseCompletion: Score | null,
    @Param('courseEngagement', ParseScorePipe) courseEngagement: Score | null,
    @Param('projectDegree', ParseScorePipe) projectDegree: Score | null,
    @Param('teamProjectDegree', ParseScorePipe) teamProjectDegree: Score | null,
    @Param('ExpectedTypeWork', ParseExpectedTypeWorkPipe)
    expectedTypeWork: ExpectedTypeWork | null,
    @Param('ExpectedContractType', ParseExpectedContractTypePipe)
    expectedContractType: ExpectedContractType | null,
    @Param('minNetSalary', ParseFilterIntPipe) minNetSalary: number | null,
    @Param('maxNetSalary', ParseFilterIntPipe) maxNetSalary: number | null,
    @Param('canTakeApprenticeship', ParseFilterBooleanPipe)
    canTakeApprenticeship: boolean | null,
    @Param('monthsOfCommercialExp', ParseFilterIntPipe)
    monthsOfCommercialExp: number | null,
  ) {
    const filterSettings: FilterSettings = {
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
    };
    return await this.studentService.getFilteredStudents(filterSettings);
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
