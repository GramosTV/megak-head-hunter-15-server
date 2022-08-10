import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { User } from './entities/user.entity';
import {
  BoolValues,
  ExpectedContractType,
  ExpectedTypeWork,
  FilterSettings,
  GetPaginatedListOfUser,
  Status,
} from 'types';
import { ParseFilterIntPipe } from 'src/pipes/parse-filterInt.pipe';
import { ParseFilterBooleanPipe } from 'src/pipes/parse-filterBoolean.pipe';
import { ParseExpectedContractTypePipe } from 'src/pipes/parse-expectedContractType.pipe';
import { ParseExpectedTypeWorkPipe } from 'src/pipes/parse-expectedTypeWork.pipe';
import { ParseScorePipe } from 'src/pipes/parse-score.pipe';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from './interfaces/user';
import { ParseStatusPipe } from 'src/pipes/parse-status.pipe';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Patch('/password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @UserObj() user: User,
    @Body() { password }: { password: string },
  ) {
    return await this.studentService.changePassword(user, password);
  }

  @Roles(Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get(
    '/filtered/:perPage/:pageNumber/:status/:courseCompletion/:courseEngagement/:projectDegree/:teamProjectDegree/:expectedTypeWork/:expectedContractType/:minNetSalary/:maxNetSalary/:canTakeApprenticeship/:monthsOfCommercialExp',
  )
  async getFilteredStudents(
    @Param('perPage', ParseFilterIntPipe) perPage: number | null,
    @Param('pageNumber', ParseFilterIntPipe) pageNumber: number | null,
    @Param('status', ParseStatusPipe) status: Status,
    @Param('courseCompletion', ParseScorePipe) courseCompletion: number | null,
    @Param('courseEngagement', ParseScorePipe) courseEngagement: number | null,
    @Param('projectDegree', ParseScorePipe) projectDegree: number | null,
    @Param('teamProjectDegree', ParseScorePipe)
    teamProjectDegree: number | null,
    @Param('expectedTypeWork', ParseExpectedTypeWorkPipe)
    expectedTypeWork: ExpectedTypeWork | null,
    @Param('expectedContractType', ParseExpectedContractTypePipe)
    expectedContractType: ExpectedContractType | null,
    @Param('minNetSalary', ParseFilterIntPipe) minNetSalary: number | null,
    @Param('maxNetSalary', ParseFilterIntPipe) maxNetSalary: number | null,
    @Param('canTakeApprenticeship', ParseFilterBooleanPipe)
    canTakeApprenticeship: BoolValues,
    @Param('monthsOfCommercialExp', ParseFilterIntPipe)
    monthsOfCommercialExp: number | null,
  ): Promise<GetPaginatedListOfUser> {
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
    return await this.studentService.getFilteredStudents(
      perPage,
      pageNumber,
      filterSettings,
      status,
    );
  }
}
