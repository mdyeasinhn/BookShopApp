
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUser } from '../User/user.interface'
import User from '../User/user.model'
import { ILoginUser } from './auth.interface'
import config from '../../app/config'



const register = async (payload: IUser) => {
  const result = await User.create(payload)
  return result
}

const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password')

  // console.log("user", user)

  if (!user) {
    throw new Error('User not found')
  }

  const isBlocked = user?.isBlocked
  if (isBlocked === true) {
    throw new Error('User is blocked')
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password)
  if (!isPasswordMatch) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign(
    {
      id: user?._id,
      email: user?.email,
      role: user?.role,
    },
    config.jwt_access_secret as string,
    {
      expiresIn: '30d',
    }
  )

  // console.log(token)

  const verifiedUser = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  }

  return { token, verifiedUser }

}

export const AuthService = {
  register,
  login,
}