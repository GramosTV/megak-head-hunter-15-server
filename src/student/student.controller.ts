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
import { ParseFilterStringPipe } from 'src/pipes/parse-filterString.pipe';
import { UpdateStudentDto } from './dto/update-student.dto';

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

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch('/hired')
  async changeStatusToHiredAndDeactivateAccount(@UserObj() user: User) {
    return await this.studentService.changeStatusToHiredAndDeactivateAccount(
      user,
    );
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Patch('/update')
  async updateAccount(
    @UserObj() user: User,
    @Body() changes: UpdateStudentDto,
  ) {
    return await this.studentService.changeStudentData(user, changes);
  }

  @Roles(Role.STUDENT)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get('/profile')
  async getStudentProfile(@UserObj() user: User) {
    return await this.studentService.getStudentProfile(user);
  }

  @Roles(Role.HR)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Get(
    '/filtered/:perPage/:pageNumber/:status/:firstName/:lastName/:courseCompletion/:courseEngagement/:projectDegree/:teamProjectDegree/:expectedTypeWork/:expectedContractType/:minNetSalary/:maxNetSalary/:canTakeApprenticeship/:monthsOfCommercialExp/:email',
  )
  async getFilteredStudents(
    @Param('perPage', ParseFilterIntPipe) perPage: number | null,
    @Param('pageNumber', ParseFilterIntPipe) pageNumber: number | null,
    @Param('status', ParseStatusPipe) status: Status,
    @Param('firstName', new ParseFilterStringPipe(255))
    firstName: string | null,
    @Param('lastName', new ParseFilterStringPipe(128)) lastName: string | null,
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
    @Param('email', new ParseFilterStringPipe(255)) email: string | null,
  ): Promise<GetPaginatedListOfUser> {
    const filterSettings: FilterSettings = {
      firstName,
      lastName,
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
