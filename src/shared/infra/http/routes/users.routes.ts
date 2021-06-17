import { Router } from 'express';

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { UpdateUserController } from '@modules/users/useCases/updateUser/UpdateUserController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();

userRoutes.post('/', createUserController.handle);
userRoutes.put('/:id', updateUserController.handle);

export { userRoutes };
