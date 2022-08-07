import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ExpectedContractType } from 'types';

@Injectable()
export class ParseExpectedContractTypePipe
  implements PipeTransform<string, ExpectedContractType | null>
{
  transform(
    value: string,
    metadata: ArgumentMetadata,
  ): ExpectedContractType | null {
    let val = String(value) as ExpectedContractType;
    const values = Object.values(ExpectedContractType);
    if (
      !values.includes(val as unknown as ExpectedContractType) &&
      value !== 'null'
    ) {
      throw new BadRequestException('Validation failed');
    } else if (value === 'null') {
      val = null;
    }
    return val;
  }
}
