import { FilterSettings, GetPaginatedListOfUser, Status } from 'types';
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { Role } from './interfaces/user';
import fetch from 'node-fetch';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async changePassword(user: User, password: string) {
    user.password = await bcrypt.hash(password, 10);
    await user.save();
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
      where: [
        {
          status,
          firstName: firstName ? Like(`%${firstName}%`) : null,
          lastName: lastName ? Like(`%${lastName}%`) : null,
          // Typeorm Like() is protected from sql injection so don't worry
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
        //Flipped firstName and lastName search
        {
          status,
          firstName: lastName ? Like(`%${lastName}%`) : null,
          lastName: firstName ? Like(`%${firstName}%`) : null,
          courseCompletion,
          courseEngagement,
          projectDegree,
          teamProjectDegree,
          expectedTypeWork,
          expectedContractType,
          expectedSalary:
            Between(minNetSalary || 0, maxNetSalary || 10000000) || null,
          canTakeApprenticeship,
          monthsOfCommercialExp,
          role: Role.STUDENT,
        },
      ],
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const pagesCount = Math.ceil(count / maxPerPage);

    return {
      users,
      pagesCount,
    };
  }

  async changeStatusToHiredAndDeactivateAccount(user: User) {
    user.status = Status.HIRED;
    return await user.save();
  }

  async changeStudentData(user: User, changes: UpdateStudentDto) {
    try {
      let userToChange = await User.findOne({
        where: {
          id: user.id,
        },
      });
      if (!userToChange) {
        return {
          ok: false,
          message: `Konto nie istnieje!`,
        };
      }
      if (!changes.email) {
        return {
          ok: false,
          message: `Email nie może być pusty!`,
        };
      }
      if (changes.githubUsername) {
        const res = await fetch(
          `https://api.github.com/users/${changes.githubUsername}`,
        );
        if (!res.ok) {
          return {
            ok: false,
            message: `Podana nazwa użytkownia GitHub jest błędna lub konto nie istnieje! Podaj swoją prawidłową nazwę konta w serwisie GitHub!`,
          };
        }
      }
      userToChange = Object.assign(userToChange, changes);
      await userToChange.save();
      return {
        ok: true,
        message: `Profil zaktualizowano!`,
      };
    } catch (e) {
      console.log(e);
      return {
        ok: false,
        message: `Wystąpił błąd! Profil nie został zaktualizowany!`,
      };
    }
  }
}
