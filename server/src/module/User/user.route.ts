import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'
import auth from '../auth/auth'



const userRoutes = Router()

userRoutes.post(
  '/create-user',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser
)
userRoutes.get('/:userId', UserControllers.getSingleUser)
userRoutes.put('/:userId', UserControllers.updateUser)
userRoutes.delete('/:userId', UserControllers.deleteUser)
userRoutes.get('/', UserControllers.getUsers)

// Admin routes
userRoutes.patch('/:userId/block', auth("admin"), UserControllers.blockUser);

export default userRoutes;

