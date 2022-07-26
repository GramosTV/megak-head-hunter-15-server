import { Injectable } from '@nestjs/common';
import { AddHrDto } from './dto/add-hr.dto';

@Injectable()
export class HrService {
  create(createHrDto: AddHrDto) {
    return 'This action adds a new hr';
  }
}
