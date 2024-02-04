import { BadRequestException, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      console.log(value);
      return this.schema.parse(value);
    } catch (error) {
      console.log(error);
      throw new BadRequestException();
    }
  }
}
