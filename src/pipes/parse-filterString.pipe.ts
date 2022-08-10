import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { maxLength } from 'class-validator';

@Injectable()
export class ParseFilterStringPipe
  implements PipeTransform<string, string | null>
{
  private readonly maxLength: number;
  constructor(maxLength: number) {
    this.maxLength = maxLength;
  }
  transform(value: string, metadata: ArgumentMetadata): string | null {
    let val = value;
    if (val.length > this.maxLength) {
      throw new BadRequestException('Validation failed');
    } else if (value === 'null') {
      val = null;
    }
    return val;
  }
}
