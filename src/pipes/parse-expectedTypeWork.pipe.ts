import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ExpectedTypeWork } from 'types';

@Injectable()
export class ParseExpectedTypeWorkPipe
  implements PipeTransform<string, ExpectedTypeWork | null>
{
  transform(
    value: string,
    metadata: ArgumentMetadata,
  ): ExpectedTypeWork | null {
    let val = String(value) as ExpectedTypeWork;
    const values = Object.values(ExpectedTypeWork);
    if (
      !values.includes(val as unknown as ExpectedTypeWork) &&
      value !== 'null'
    ) {
      throw new BadRequestException('Validation failed');
    } else if (value === 'null') {
      val = null;
    }
    return val;
  }
}
