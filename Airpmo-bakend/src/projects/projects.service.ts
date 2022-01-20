import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { project, projectDocument } from 'src/schemas/projects.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(project.name) private projectModel: Model<projectDocument>){}

 async create(createProjectDto: CreateProjectDto) {
    return this.projectModel.create(createProjectDto)
  }

  async findAll() {
    return await this.projectModel.find()
  }

  async findOne(id: string) {
    try{
    const user= await this.projectModel.findOne({ _id: id })
    return user 
    }catch{
      throw new NotFoundException("project not exist")
    }
   }

 async update(id: string, updateProjectDto: UpdateProjectDto) {
  try{
 const user = await this.projectModel.updateOne({"_id":id},{...updateProjectDto})
 return {
   massage:"update sucessfully"
      }
}
catch{
  throw new NotFoundException("project not exist")
}
 }
 async remove(id:string) {
   try {
    const user= await this.projectModel.deleteOne({"_id":id})
    return{
      massage:"Delete sucessfully"
    }
   } catch  {
     throw new NotFoundException("project not exist")
   }
    
  }
  
}
