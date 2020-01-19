import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from '@intensity/users/users.service';
import { LoggedGuard } from '@shared/guards/logged.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { MulterAvatarFactory } from '@shared/factories/multer-avatar.factory';
import * as fs from 'fs';
import { AdminOrTrainerGuard } from '@intensity/guards/admin-or-trainer.guard';
import { UpdateStatusDto } from '@intensity/users/dto/update-status.dto';
import { AdminGuard } from '@intensity/guards/admin.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { User } from '@intensity/users/user.entity';
import { ApiImplicitParam } from '@nestjs/swagger/dist/decorators/api-implicit-param.decorator';
import { UploadAvatarDto } from '@intensity/users/dto/upload-avatar.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {
  }

  @ApiOkResponse({ description: 'Returns all users', type: [User] })
  @Get('')
  public async getAll(@Res() res) {
    const users = await this.userService.getAll();

    return res.status(HttpStatus.OK).json(users);
  }

  @ApiOkResponse({ description: 'Returns user with  the requested id', type: User })
  @ApiImplicitParam({ name: 'id', type: 'number' })
  @Get('/:id')
  public async getOneById(@Param() param: { id: number }, @Res() res) {
    const user = await this.userService.getById(param.id);

    return res.status(HttpStatus.OK).json(user);
  }

  @ApiOkResponse({ description: 'Returns users avatar for the user with the sent userId' })
  @ApiNotFoundResponse({ description: 'Avatar not found' })
  @ApiImplicitParam({ name: 'userId', type: 'number' })
  @Get(':userId/avatar')
  public async getImage(@Param() param, @Res() res) {
    let file = path.join(MulterAvatarFactory.AvatarPath, `${param.userId}.jpg`);

    try {
      await fs.promises.access(file);
    } catch (e) {
      file = path.join(MulterAvatarFactory.AvatarPath, `${param.userId}.jpeg`);
      try {
        await fs.promises.access(file);
      } catch (e) {
        file = path.join(MulterAvatarFactory.AvatarPath, `${param.userId}.png`);
        try {
          await fs.promises.access(file);
        } catch (e) {
          file = path.join(MulterAvatarFactory.AvatarPath, `default.png`);
        }
      }
    }

    return res.status(HttpStatus.OK).download(file);
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadAvatarDto })
  @ApiOkResponse({ description: 'Saves the sent avatar for the logged user' })
  @ApiForbiddenResponse({ description: 'Not logged' })
  @Post('/avatar')
  @UseGuards(LoggedGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  public async upload(@UploadedFile() avatar, @Res() res) {
    return res.status(HttpStatus.OK).json({ avatar: avatar.filename });
  }

  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'userId', type: 'number' })
  @ApiOkResponse({ description: 'Updates the user isActive field to true' })
  @ApiForbiddenResponse({ description: 'Not logged' })
  @Put(':userId/status')
  @UseGuards(LoggedGuard, AdminOrTrainerGuard)
  public async updateUserStatus(@Param() param, @Body() updateStatusDto: UpdateStatusDto, @Res() res) {

    await this.userService.updateStatus(param.userId, updateStatusDto);

    return res.status(HttpStatus.OK).json({ message: 'Ok' });
  }

  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'userId', type: 'number' })
  @ApiOkResponse({ description: 'Activates the user and sets the number of trainings to 16' })
  @ApiForbiddenResponse({ description: 'Not logged' })
  @Put(':userId/payment')
  @UseGuards(LoggedGuard, AdminOrTrainerGuard)
  public async addPayment(@Param() param, @Res() res) {

    await this.userService.addPayment(param.userId);

    return res.status(HttpStatus.OK).json({ message: 'Ok' });
  }

  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'userId', type: 'number' })
  @ApiOkResponse({ description: 'Deletes the user with the sent id', type: User })
  @ApiForbiddenResponse({ description: 'Not logged' })
  @Delete(':userId')
  @UseGuards(LoggedGuard, AdminGuard)
  public async deleteUser(@Param() param, @Res() res) {

    const deletedUser = await this.userService.delete(param.userId);

    return res.status(HttpStatus.OK).json(deletedUser);
  }
}
