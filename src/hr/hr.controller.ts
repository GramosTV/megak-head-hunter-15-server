import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { HrService } from './hr.service';
import { AddHrDto } from './dto/add-hr.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../student/interfaces/user';
import { RoleGuard } from '../auth/role.guard';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Post()
  create(@Body() newHr: AddHrDto) {
    return this.hrService.addHr(newHr);
  }
}
