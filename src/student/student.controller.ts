import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
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
  @Get('/filtered/filterSettings?')
  async getFilteredStudents(
    @Query('itemsPerPage', ParseFilterIntPipe) perPage: number | null,
    @Query('page', ParseFilterIntPipe) pageNumber: number | null,
    @Query('studentStatus', ParseStatusPipe) status: Status,
    @Query('email', new ParseFilterStringPipe(255)) email: string | null,
    @Query('firstName', new ParseFilterStringPipe(255))
    firstName: string | null,
    @Query('lastName', new ParseFilterStringPipe(128)) lastName: string | null,
    @Query('courseCompletion', ParseScorePipe) courseCompletion: number | null,
    @Query('courseEngagement', ParseScorePipe) courseEngagement: number | null,
    @Query('projectDegree', ParseScorePipe) projectDegree: number | null,
    @Query('teamProjectDegree', ParseScorePipe)
    teamProjectDegree: number | null,
    @Query('expectedTypeWork', ParseExpectedTypeWorkPipe)
    expectedTypeWork: ExpectedTypeWork | null,
    @Query('expectedContractType', ParseExpectedContractTypePipe)
    expectedContractType: ExpectedContractType | null,
    @Query('minNetSalary', ParseFilterIntPipe) minNetSalary: number | null,
    @Query('maxNetSalary', ParseFilterIntPipe) maxNetSalary: number | null,
    @Query('canTakeApprenticeship', ParseFilterBooleanPipe)
    canTakeApprenticeship: BoolValues,
    @Query('monthsOfCommercialExp', ParseFilterIntPipe)
    monthsOfCommercialExp: number | null,
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
      email,
    };
    return await this.studentService.getFilteredStudents(
      perPage,
      pageNumber,
      filterSettings,
      status,
    );
  }
}
