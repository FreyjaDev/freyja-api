import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('types')
export class RatingTypeController {
  @Get()
  getAllRatingTypes() {}

  @Post()
  createRatingType() {}

  @Patch()
  editRatingType() {}

  @Delete()
  deleteRatingType() {}
}
