import { Router } from 'express';
import multer from 'multer';

import { CreateItemController } from '@modules/items/useCases/createItem/CreateItemController';
import { UpdateItemController } from '@modules/items/useCases/updateItem/UpdateItemController';
import { UploadItemImageController } from '@modules/items/useCases/uploadItemImage/UploadItemController';

import { multerUploadConfig } from '../../../../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const itemRoutes = Router();

const createItemController = new CreateItemController();
const uploadItemImageController = new UploadItemImageController();
const updateItemController = new UpdateItemController();

const upload = multer(multerUploadConfig());

itemRoutes.use(ensureAuthenticated);

itemRoutes.post('/', createItemController.handle);

itemRoutes.patch(
  '/image/:id',
  upload.single('image'),
  uploadItemImageController.handle,
);

itemRoutes.put('/:id', updateItemController.handle);

export { itemRoutes };
