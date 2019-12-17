import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wod } from '@intensity/wods/wod.entity';
import { AbstractService } from '@intensity/types/abstract.service';

@Injectable()
export class WodsService extends AbstractService<Wod> {
  constructor(@InjectRepository(Wod) wodsRepository: Repository<Wod>) {
    super(wodsRepository);
  }
}
