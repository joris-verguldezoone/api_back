import { Injectable } from '@nestjs/common';
import { CreatePartyDto } from '../dto/create-party.dto';
import { UpdatePartyDto } from '../dto/update-party.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Partie } from '../model/entities/party.entity';
import { PartiesInterface } from '../model/parties.interface';
import { CreateReglesjeuxDto } from '../../reglesjeux/dto/create-reglesjeux.dto';
import { Reglesjeux } from '../../reglesjeux/model/entities/reglesjeux.entity';

@Injectable()
export class PartiesService {
  constructor(
    @InjectRepository(Partie)
    private readonly partieRepository: Repository<Partie>,
  ) {}

  create(partie: Partie): Promise<Partie> {
    return this.partieRepository.save(partie);
  }

  findAll(): Promise<Partie[]> {
    return this.partieRepository.find();
  }

  findOne(id: number) {
    return this.partieRepository.findOne({ id });
  }

  update(id: number, partie: Partie): Promise<any> {
    return this.partieRepository.update(id, partie);
  }

  remove(id: number): Promise<any> {
    return this.partieRepository.delete(id);
  }
  async getPartiesWithFilters(filterDto: CreatePartyDto): Promise<Partie[]> {
    console.log(filterDto);
    const { nbjoueurs, iddifficulte, idjeux, createdat, finishedat } =
      filterDto;

    let reglesJeux = await this.findAll();

    if (idjeux) {
      reglesJeux = reglesJeux.filter((task) => task.idjeux == idjeux);
    }
    if (nbjoueurs) {
      reglesJeux = reglesJeux.filter((task) => task.nbjoueurs === nbjoueurs);
    }
    if (createdat) {
      reglesJeux = reglesJeux.filter((task) => task.createdat == createdat);
    }
    if (iddifficulte) {
      reglesJeux = reglesJeux.filter(
        (task) => task.iddifficulte == iddifficulte,
      );
    }
    if (finishedat) {
      reglesJeux = reglesJeux.filter((task) => task.finishedat == finishedat);
    }

    return reglesJeux;
  }
}
