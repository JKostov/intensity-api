import { Body, Controller, Get, HttpStatus, Post, Query, Res, UseGuards } from '@nestjs/common';
import { TrainingsService } from '@intensity/trainings/trainings.service';
import { LoggedGuard } from '@shared/guards/logged.guard';
import { SignInOutDto } from '@intensity/trainings/dto/sign-in-out.dto';
import { UserToken } from '@intensity/auth/user-token.decorator';

@Controller('trainings')
export class TrainingsController {

  constructor(private readonly trainingsService: TrainingsService) {
  }

  @Get('')
  public async createWod(@Query('date') date, @Res() res) {
    const training = await this.trainingsService.getByDate(date);

    return res.status(HttpStatus.OK).json(training);
  }

  @Post('/sign')
  @UseGuards(LoggedGuard)
  public async signForTraining(@Body() signInOutDto: SignInOutDto, @UserToken() userToken, @Res() res) {
    const trainingIds = await this.trainingsService.singUserToTraining(userToken, signInOutDto);

    return res.status(HttpStatus.OK).json(trainingIds);
  }

  @Post('/sign-out')
  @UseGuards(LoggedGuard)
  public async signOutOfTraining(@Body() signInOutDto: SignInOutDto, @UserToken() userToken, @Res() res) {
    const trainingIds = await this.trainingsService.singOutUserFromTraining(userToken, signInOutDto);

    return res.status(HttpStatus.OK).json(trainingIds);
  }
}
