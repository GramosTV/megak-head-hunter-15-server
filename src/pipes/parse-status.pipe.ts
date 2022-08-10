import { Status } from 'types';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseStatusPipe implements PipeTransform<string, Status> {
  transform(value: string, metadata: ArgumentMetadata): Status {
    const val = String(value) as Status;
    const values = Object.values(Status);
    if (!values.includes(val as unknown as Status)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
