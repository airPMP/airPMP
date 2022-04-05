import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MyJobCardEmployeeService } from './my-job-card-employee.service';
import { CreateMyJobCardEmployeeDto } from './dto/create-my-job-card-employee.dto';
import { UpdateMyJobCardEmployeeDto } from './dto/update-my-job-card-employee.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';
@ApiTags('my_job_card_empyee')
@Controller('/api')
export class MyJobCardEmployeeController {
  constructor(
    private readonly myJobCardEmployeeService: MyJobCardEmployeeService,
  ) {}

  @Auth('CREATE_EMPLOYEE_IN_MY_JOB_CARD')
  @Post('create_my_job_card_employee')
  create(@Body() createMyJobCardEmployeeDto: CreateMyJobCardEmployeeDto) {
    return this.myJobCardEmployeeService.create(createMyJobCardEmployeeDto);
  }

  @Auth('FIND_ALL_EMPLOYEE_IN_MY_JOB_CARD')
  @Get('find_all_my_job_card_employee')
  findAll() {
    return this.myJobCardEmployeeService.findAll();
  }

  @Auth('FIND_EMPLOYEE_IN_MY_JOB_CARD')
  @Get('find_my_job_card_employee/:id')
  findOne(@Param('id') id: string) {
    return this.myJobCardEmployeeService.findOne(id);
  }

  @Auth('UPDATE_EMPLOYEE_IN_MY_JOB_CARD')
  @Patch('update_my_job_card_employee/:id')
  update(
    @Param('id') id: string,
    @Body() updateMyJobCardEmployeeDto: UpdateMyJobCardEmployeeDto,
  ) {
    return this.myJobCardEmployeeService.update(id, updateMyJobCardEmployeeDto);
  }

  @Auth('DELETE_EMPLOYEE_IN_MY_JOB_CARD')
  @Delete('delete_my_job_card_employee/:id')
  remove(@Param('id') id: string) {
    return this.myJobCardEmployeeService.remove(id);
  }

  @Auth('FIND_EMPLOYEE_IN_MY_JOB_CARD_BY_JC_ID')
  @Get('find_my_job_card_employee_by_jc_no/:id')
  findjc(@Param('id') id: string) {
    return this.myJobCardEmployeeService.findemployeebyjcid(id);
  }
}