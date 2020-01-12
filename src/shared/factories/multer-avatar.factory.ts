import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express/multer/interfaces/files-upload-module.interface';
import { diskStorage } from 'multer';
import * as mime from 'mime-types';

@Injectable()
export class MulterAvatarFactory implements MulterOptionsFactory {
  public static readonly AvatarPath = 'uploads/avatars';

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => cb(null, MulterAvatarFactory.AvatarPath),
        filename: (req, file, cb) => {
          if (!req.user) {
            return;
          }

          return cb(null, `${req.user.id}.${mime.extension(file.mimetype)}`);
        },
      }),
    };
  }
}
