import { IUser } from './user.interface'
import User from './user.model'

const createUser = async (payload: IUser) => {
  const result = await User.create(payload)
  return result
}

const getUsers = async () => {
  const result = await User.find()
  return result
}

const getSingleUser = async (id: string) => {
  const result = await User.findById(id)
  return result
}

const updateUser = async (id: string, data: IUser) => {
  const result = await User.findByIdAndUpdate(id, data, {
    new: true,
  })
  return result
}

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
}


const blockUser = async (userId: string) => {
  const user = await User.findById(userId);

  if(!user) {
    throw new Error('User not found');
  }

  if(user.isBlocked){
    throw new Error('User is already blocked');
  }

  user.isBlocked = true;
  await user.save();

  return user
}

const retrieveUserProfile  = async (email: string) => {
  const result = await User.findOne({email})
  return result;
}



export const userServices = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  blockUser,
  retrieveUserProfile
}