import { Request, Response } from 'express'
import catchAsync from '../../utils/catchAsync'
import { AuthService } from './auth.service'
import sendResponse from '../../utils/sendResponse'
import { StatusCodes } from 'http-status-codes'

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body)

  const data = {
    _id: result._id,
    name: result.name,
    email: result.email
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: data,
  })
})

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body)

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Login successful',
    data: {
      token: result.token,
    }
  })
})

export const AuthController = {
  register,
  login,
}