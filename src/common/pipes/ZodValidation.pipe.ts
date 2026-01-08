import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { type ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      // .parse() will apply defaults and coerce types (like string '1' to number 1)
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      // Map Zod errors to a readable NestJS exception
      throw new BadRequestException({
        message: 'Validation failed',
        errors: error.errors.map((err: any) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      });
    }
  }
}
