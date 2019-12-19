import { Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '@intensity/users/users.service';
import { LoggedGuard } from '@shared/guards/logged.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

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

  // @Post('')
  // @UseGuards(LoggedGuard)
  // @UseInterceptors(FilesInterceptor('images[]', 10))
  // public async upload(@UploadedFiles() images, @Res() res) {
  //   const imageUrls: string[] = [];
  //
  //   images.forEach(i => imageUrls.push(i.filename));
  //
  //   return res.status(HttpStatus.OK).json({ imageUrls });
  // }
  //
  // @Get(':fileName')
  // public async getImage(@Param() param, @Res() res) {
  //   const file = path.join('uploads/images', param.fileName);
  //
  //   return res.status(HttpStatus.OK).download(file) ;
  // }
  //
  // @Delete(':fileName')
  // public deleteImage(@Param() param, @Res() res) {
  //   const file = path.join('uploads/images', param.fileName);
  //   let success = false;
  //
  //   try {
  //     fs.unlinkSync(file);
  //     success = true;
  //   } catch (e) {
  //     success = false;
  //   }
  //
  //   return res.status(HttpStatus.OK).json({ success }) ;
  // }
}
