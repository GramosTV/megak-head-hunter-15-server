import { User } from './../student/entities/user.entity';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ArrayOfStudentsDto,
  CreateStudentDto,
} from 'src/student/dto/create-student.dto';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { StudentService } from 'src/student/student.service';
import { Repository } from 'typeorm';
import { Score } from 'types';
import { JwtPayload } from 'src/auth/jwt.strategy';
import { sign } from 'jsonwebtoken';
import { MailService } from 'src/mail/mail.service';
import { registrationMailTemplate } from 'src/templates/email/registration-mail';


@Injectable()
export class AdminService {
  constructor(
    @Inject(forwardRef(() => StudentService))
    private studentService: StudentService,
    @Inject(MailService)
    private mailService: MailService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  async addStudents(createStudentsDtos: ArrayOfStudentsDto) {
    const message = [];
    await Promise.all(
      createStudentsDtos.students.map(async (e: CreateStudentDto) => {
        const mailCheck = await User.findBy({
          email: e.email,
        });
        if (mailCheck.length) {
          message.push(
            `Konto zarejestrowane na adres e-mail: ${mailCheck[0].email} już istnieje!`,
          );
          return;
        }
        const user = new User();
        user.email = e.email;
        user.courseCompletion = e.courseCompletion;
        user.courseEngagement = e.courseEngagement;
        user.projectDegree = e.projectDegree;
        user.teamProjectDegree = e.teamProjectDegree;
        user.bonusProjectUrls = e.bonusProjectUrls;
        await user.save();
        const userId = (await User.findOne({ where: { email: user.email } })).id;
        const payload: JwtPayload = { id: userId };
        const expiresIn = 60 * 60 * 24 * Number(process.env.REGISTRATION_LINK_EXP_TIME_IN_DAYS);
        const accessToken = sign(payload, process.env.JWT_SECRET, { expiresIn });
        const url = process.env.URL + `/register/${userId}/${accessToken}`;
        await this.mailService.sendMail(
          user.email,
          'Link do rejestracji do serwisu MegaK Head Hunter',
          registrationMailTemplate(url),
      );
        message.push(`Pomyślnie zarejestrowano konto: ${e.email}`);
      }),
    );
    return {
      ok: true,
      message,
    };
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
