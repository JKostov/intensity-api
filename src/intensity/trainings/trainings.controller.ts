import { Body, Controller, Get, HttpStatus, Post, Query, Res, UseGuards } from '@nestjs/common';
import { TrainingsService } from '@intensity/trainings/trainings.service';
import { LoggedGuard } from '@shared/guards/logged.guard';
import { SignInOutDto } from '@intensity/trainings/dto/sign-in-out.dto';
import { UserToken } from '@intensity/auth/user-token.decorator';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { Training } from '@intensity/trainings/training.entity';

@Controller('trainings')
export class TrainingsController {

  constructor(private readonly trainingsService: TrainingsService) {
  }

  @ApiImplicitQuery({ name: 'date', type: 'string' })
  @ApiOkResponse({ description: 'Gets training by date', type: Training })
  @Get('')
  public async getTraining(@Query('date') date, @Res() res) {
    const training = await this.trainingsService.getByDate(date);

    return res.status(HttpStatus.OK).json(training);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Sign the currently logged user for the training', type: [Number] })
  @ApiForbiddenResponse({ description: 'Not logged' })
  @Post('/sign')
  @UseGuards(LoggedGuard)
  public async signForTraining(@Body() signInOutDto: SignInOutDto, @UserToken() userToken, @Res() res) {
    const trainingIds = await this.trainingsService.singUserToTraining(userToken, signInOutDto);

    return res.status(HttpStatus.OK).json(trainingIds);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Sign out the currently logged user for the training', type: [Number] })
  @ApiForbiddenResponse({ description: 'Not logged' })
  @Post('/sign-out')
  @UseGuards(LoggedGuard)
  public async signOutOfTraining(@Body() signInOutDto: SignInOutDto, @UserToken() userToken, @Res() res) {
    const trainingIds = await this.trainingsService.singOutUserFromTraining(userToken, signInOutDto);

    return res.status(HttpStatus.OK).json(trainingIds);
  }
}
