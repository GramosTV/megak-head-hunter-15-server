import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { BoolValues } from '../../types';

@Injectable()
export class ParseFilterBooleanPipe
  implements PipeTransform<string, BoolValues | null>
{
  transform(value: string, metadata: ArgumentMetadata): BoolValues | null {
    let val = String(value) as BoolValues;
    const values = Object.values(BoolValues);
    if (!values.includes(val as unknown as BoolValues) && value !== 'null') {
      throw new BadRequestException('Validation failed');
    } else if (value === 'null') {
      val = null;
    }
    return val;
  }
}
