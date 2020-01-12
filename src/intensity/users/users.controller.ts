import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from '@intensity/users/users.service';
import { LoggedGuard } from '@shared/guards/logged.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { MulterAvatarFactory } from '@shared/factories/multer-avatar.factory';
import * as fs from 'fs';
import { AdminOrTrainerGuard } from '@intensity/guards/admin-or-trainer.guard';
import { UpdateStatusDto } from '@intensity/users/dto/update-status.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @Get('')
  public async getAll(@Res() res) {
    const users = await this.userService.getAll();

    return res.status(HttpStatus.OK).json(users);
  }

  @Get('/:id')
  public async getOneById(@Param() param, @Res() res) {
    const user = await this.userService.getById(param.id);

    return res.status(HttpStatus.OK).json(user);
  }

  @Get(':userId/avatar')
  public async getImage(@Param() param, @Res() res) {
    let file = path.join(MulterAvatarFactory.AvatarPath, `${param.userId}.jpg`);

    try {
      await fs.promises.access(file);
    } catch (e) {
      file = path.join(MulterAvatarFactory.AvatarPath, `${param.userId}.png`);
      try {
        await fs.promises.access(file);
      } catch (e) {
        throw new HttpException('Avatar not found.', HttpStatus.NOT_FOUND);
      }
    }

    return res.status(HttpStatus.OK).download(file);
  }

  @Post('/avatar')
  @UseGuards(LoggedGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  public async upload(@UploadedFile() avatar, @Res() res) {
    return res.status(HttpStatus.OK).json({ avatar: avatar.filename });
  }

  @Put(':userId/status')
  @UseGuards(LoggedGuard, AdminOrTrainerGuard)
  public async updateUserStatus(@Param() param, @Body() updateStatusDto: UpdateStatusDto, @Res() res) {

    await this.userService.updateStatus(param.userId, updateStatusDto);

    return res.status(HttpStatus.OK).json({ message: 'Ok' });
  }

  @Put(':userId/payment')
  @UseGuards(LoggedGuard, AdminOrTrainerGuard)
  public async addPayment(@Param() param, @Res() res) {

    await this.userService.addPayment(param.userId);

    return res.status(HttpStatus.OK).json({ message: 'Ok' });
  }
}
