import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseFilterIntPipe
  implements PipeTransform<string, number | null>
{
  transform(value: string, metadata: ArgumentMetadata): number | null {
    let val = Math.floor(parseInt(value));
    if ((isNaN(val) && value !== 'null') || val < 0) {
      throw new BadRequestException('Validation failed');
    } else if (value === 'null') {
      val = null;
    }
    return val;
  }
}
