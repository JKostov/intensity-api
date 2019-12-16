import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '@shared/shared.module';
import { DatabaseFactory } from './database.factory';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [SharedModule],
    useClass: DatabaseFactory,
  })],
})
export class DatabaseModule { }
