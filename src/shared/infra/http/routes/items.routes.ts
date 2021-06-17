import { Router } from 'express';
import multer from 'multer';

import { CreateItemController } from '@modules/items/useCases/createItem/CreateItemController';
import { UploadItemImageController } from '@modules/items/useCases/uploadItemImage/UploadItemController';

import uploadConfig from '../../../../config/upload';

const itemRoutes = Router();

const createItemController = new CreateItemController();
const uploadItemImageController = new UploadItemImageController();

const upload = multer(uploadConfig.upload('./tmp/items'));

itemRoutes.post('/', createItemController.handle);
itemRoutes.post(
  '/imagens/:id',
  upload.single('imagem'),
  uploadItemImageController.handle,
);

export { itemRoutes };
