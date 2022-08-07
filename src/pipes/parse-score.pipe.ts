import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Score } from 'types';

@Injectable()
export class ParseScorePipe implements PipeTransform<string, Score | null> {
  transform(value: string, metadata: ArgumentMetadata): Score | null {
    let val = Math.floor(parseInt(value));
    if (isNaN(val) && value !== 'null') {
      throw new BadRequestException('Validation failed');
    } else if (val < 0 && val > 5) {
      throw new BadRequestException('Validation failed');
    } else if (value === 'null') {
      val = null;
    }
    return val;
  }
}
