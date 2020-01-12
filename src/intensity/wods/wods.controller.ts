import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { LoggedGuard } from '@shared/guards/logged.guard';
import { WodsService } from '@intensity/wods/wods.service';
import { CreateWodDto } from '@intensity/wods/dto/create-wod.dto';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse } from '@nestjs/swagger';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { Wod } from '@intensity/wods/wod.entity';

@Controller('wods')
export class WodsController {

  constructor(private readonly wodsService: WodsService) {
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Creates a new wod', type: Wod })
  @ApiForbiddenResponse({ description: 'Not logged' })
  @Post('')
  @UseGuards(LoggedGuard)
  public async createWod(@Body() createWodDto: CreateWodDto, @Res() res) {

    const wod = await this.wodsService.createNew(createWodDto);

    return res.status(HttpStatus.OK).json(wod);
  }

  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'wodId', type: 'number' })
  @ApiOkResponse({ description: 'Updates the wod with the sent id', type: Wod })
  @ApiForbiddenResponse({ description: 'Not logged' })
  @Put(':wodId')
  @UseGuards(LoggedGuard)
  public async updateWod(@Param() param, @Body() createWodDto: CreateWodDto, @Res() res) {

    const wod = await this.wodsService.update(param.wodId, createWodDto);

    return res.status(HttpStatus.OK).json(wod);
  }

  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'wodId', type: 'number' })
  @ApiOkResponse({ description: 'Deletes the wod with the sent id', type: Wod })
  @ApiForbiddenResponse({ description: 'Not logged' })
  @Delete(':wodId')
  @UseGuards(LoggedGuard)
  public async deleteWod(@Param() param, @Res() res) {

    const wod = await this.wodsService.delete(param.wodId);

    return res.status(HttpStatus.OK).json(wod);
  }
}
