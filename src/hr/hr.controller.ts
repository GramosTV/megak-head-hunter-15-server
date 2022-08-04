import { FilterSettings, Score } from 'types';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Inject,
  ParseIntPipe,
  Param,
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
    '/filterStudents/:courseCompletion/:courseEngagement/:projectDegree/:teamProjectDegree/:expectedTypeWork/:expectedContractType/:minNetSalary/:maxNetSalary/:canTakeApprenticeship/:monthsOfCommercialExperience',
  )
  async getFilteredStudents(
    @Param('courseCompletion', ParseScorePipe) courseCompletion: Score | null,
    @Param('courseEngagement', ParseScorePipe) courseEngagement: Score | null,
    @Param('projectDegree', ParseScorePipe) projectDegree: Score | null,
    @Param('teamProjectDegree', ParseScorePipe) teamProjectDegree: Score | null,
    @Param('minNetSalary', ParseFilterIntPipe) minNetSalary: number | null,
    @Param('maxNetSalary', ParseFilterIntPipe) maxNetSalary: number | null,
    @Param('monthsOfCommercialExp', ParseFilterIntPipe)
    monthsOfCommercialExp: number | null,
  ) {
    const filterSettings: FilterSettings = {
      courseCompletion,
      courseEngagement,
      projectDegree,
      teamProjectDegree,
      minNetSalary,
      maxNetSalary,
      monthsOfCommercialExp,

    };
    return await this.studentService.getFilteredStudents(filterSettings);
  }
}
