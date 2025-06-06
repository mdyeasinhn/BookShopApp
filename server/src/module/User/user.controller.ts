import { StatusCodes } from 'http-status-codes'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { userServices } from './user.services'


const createUser = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await userServices.createUser(payload)

  const data = {
    _id: result._id,
    name : result.name,
    email : result.email
  }
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: 'User is created successfully',
    data: data,
  })
})

const getUsers = catchAsync(async (req, res) => {
  const result = await userServices.getUsers()
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Users getting succesfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const result = await userServices.getSingleUser(userId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Single User getting succesfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const body = req.body
  const result = await userServices.updateUser(userId, body)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User updated succesfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  await userServices.deleteUser(userId)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User deleted succesfully',
    data: {},
  })
})

const blockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  await userServices.blockUser(userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User blocked successfully',
  })
})
const retrieveUserProfile = catchAsync(async (req, res) => {
  const {email} = req.params
  
  const result = await userServices.retrieveUserProfile(email)
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'User profile retrieved successfully',
    data: result,
  })
})

export const UserControllers = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  blockUser,
  retrieveUserProfile
}