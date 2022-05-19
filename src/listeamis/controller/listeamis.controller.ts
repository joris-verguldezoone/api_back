import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ListeamisService } from '../service/listeamis.service';

import { ApiTags } from '@nestjs/swagger';

import { Listeamis } from '../model/entities/listeami.entity';
import { CreateReglesjeuxDto } from '../../reglesjeux/dto/create-reglesjeux.dto';
import { Reglesjeux } from '../../reglesjeux/model/entities/reglesjeux.entity';
import { CreateListeamiDto } from '../dto/create-listeami.dto';

@ApiTags('liste_amis')
@Controller('listeamis')
export class ListeamisController {
  constructor(private readonly listeamisService: ListeamisService) {}
  @Post()
  create(@Body() listeamis: Listeamis): Promise<Listeamis> {
    return this.listeamisService.create(listeamis);
  }

  @Get()
  findAll(): Promise<Listeamis[]> {
    return this.listeamisService.findAll();
  }

  @Get(':id')
  findOne(@Param() params): Promise<Listeamis> {
    return this.listeamisService.findOne(params.id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() listeamis: Listeamis): Promise<any> {
    return this.listeamisService.update(+id, listeamis);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Listeamis> {
    return this.listeamisService.remove(Number(id));
  }
  @Get()
  getTask(@Query() filterDto: CreateListeamiDto): Promise<Listeamis[]> {
    console.log(filterDto);
    if (Object.keys(filterDto).length) {
      console.log(filterDto);
      return this.listeamisService.getListeAmisWithFilters(filterDto);
    } else {
      console.log('?????');
      return this.listeamisService.findAll();
    }
  }
}
