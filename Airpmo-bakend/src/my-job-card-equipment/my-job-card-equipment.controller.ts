import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { MyJobCardEquipmentService } from './my-job-card-equipment.service';
import { CreateMyJobCardEquipmentDto } from './dto/create-my-job-card-equipment.dto';
import { UpdateMyJobCardEquipmentDto } from './dto/update-my-job-card-equipment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/decorator/auth.decorator';

@ApiTags('my_job_card_equipmets')
@Controller('/api')
export class MyJobCardEquipmentController {
  constructor(
    private readonly myJobCardEquipmentService: MyJobCardEquipmentService,
  ) {}

  @Auth()
  @Post('create_my_job_card_equipments')
  create(@Body() createMyJobCardEquipmentDto: CreateMyJobCardEquipmentDto) {
    return this.myJobCardEquipmentService.create(createMyJobCardEquipmentDto);
  }

  @Auth('FIND_ALL_EQUIPMENTS_IN_MY_JOB_CARD')
  @Get('find_my_all_job_card_equipments')
  findAll(@Req() req) {
    return this.myJobCardEquipmentService.findAll(req);
  }

  @Auth('FIND_EQUIPMENT_IN_MY_JOB_CARD')
  @Get('find_my_job_card_equipments/:id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.myJobCardEquipmentService.findOne(id, req);
  }

  @Auth('UPDATE_EMPLOYEE_IN_MY_JOB_CARD')
  @Patch('update_my_job_card_equipments/:id')
  update(
    @Param('id') id: string,
    @Body() updateMyJobCardEquipmentDto: UpdateMyJobCardEquipmentDto,
  ) {
    return this.myJobCardEquipmentService.update(
      id,
      updateMyJobCardEquipmentDto,
    );
  }

  @Auth('DELETE_EQUIPMENT_IN_MY_JOB_CARD')
  @Delete('delete_my_job_card_equipments/:id')
  remove(@Param('id') id: string) {
    return this.myJobCardEquipmentService.remove(id);
  }

  @Auth('FIND_EQUIPMENTS_IN_MY_JOB_CARD_BY_JC_ID')
  @Get('find_my_job_card_equipments_by_jc_no/:id')
  findjc(@Param('id') id: string,@Req() req) {
    return this.myJobCardEquipmentService.findemployeebyjcid(id,req);
  }
}
