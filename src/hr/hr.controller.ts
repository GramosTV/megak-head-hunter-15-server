import { Controller, Post, Body } from '@nestjs/common';
import { HrService } from './hr.service';
import { AddHrDto } from './dto/add-hr.dto';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Post()
  create(@Body() newHr: AddHrDto) {
    return this.hrService.addHr(newHr);
  }
}
