import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { LoggedGuard } from '@shared/guards/logged.guard';
import { WodsService } from '@intensity/wods/wods.service';
import { CreateWodDto } from '@intensity/wods/dto/create-wod.dto';

@Controller('wods')
export class WodsController {

  constructor(private readonly wodsService: WodsService) {
  }

  @Post('')
  @UseGuards(LoggedGuard)
  public async createWod(@Body() createWodDto: CreateWodDto, @Res() res) {

    const wod = await this.wodsService.createNew(createWodDto);

    return res.status(HttpStatus.OK).json(wod);
  }

  @Put(':wodId')
  @UseGuards(LoggedGuard)
  public async updateWod(@Param() param, @Body() createWodDto: CreateWodDto, @Res() res) {

    const wod = await this.wodsService.update(param.wodId, createWodDto);

    return res.status(HttpStatus.OK).json(wod);
  }

  @Delete(':wodId')
  @UseGuards(LoggedGuard)
  public async deleteWod(@Param() param, @Res() res) {

    const wod = await this.wodsService.delete(param.wodId);

    return res.status(HttpStatus.OK).json(wod);
  }
}
