import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
export class forgetuserdto {
    @IsString()
    @ApiProperty()
    Email: string;
}