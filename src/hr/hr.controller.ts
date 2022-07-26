import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HrService } from './hr.service';
import { AddHrDto } from './dto/add-hr.dto';

@Controller('hr')
export class HrController {
  constructor(private readonly hrService: HrService) {}

  @Post()
  create(@Body() createHrDto: AddHrDto) {
    return this.hrService.create(createHrDto);
  }
}
