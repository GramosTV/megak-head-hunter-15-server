import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseFilterBooleanPipe
  implements PipeTransform<string, boolean | null>
{
  transform(value: string, metadata: ArgumentMetadata): boolean | null {
    let val = Boolean(value);
    if (value === 'null') {
      val = null;
    }
    return val;
  }
}
