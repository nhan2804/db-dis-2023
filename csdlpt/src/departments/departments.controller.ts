import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BaseController } from 'src/app/controllers/base.controller';
import { ValidIdPipe } from 'src/app/pipes/validation.pipe';
import { Public } from 'src/auth/guards/public';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';
@Public()
@Controller('departments')
export class DepartmentsController extends BaseController<Department> {
  constructor(readonly departmentsService: DepartmentsService) {
    super(departmentsService as any);
  }

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.baseCreate(createDepartmentDto);
  }
  @Patch('/:id')
  //current user
  async update(
    @Param('id', ValidIdPipe) id: string,
    @Body() body: CreateDepartmentDto,
  ) {
    // Validate req
    // Ex: reset some fields if role of session not allow

    /*Check double xid [redis]*/
    return this.service.baseUpdateOne(id, body as any);
  }
  @Get()
  findAll() {
    return this.departmentsService.baseFilter();
  }
  @Delete('/:id')
  //current user
  async deleteP(@Param('id', ValidIdPipe) id: string) {
    return this.service.baseDeleteOnce(id);
  }
}
