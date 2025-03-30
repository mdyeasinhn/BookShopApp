import { Delete } from "lucide-react"

const UserDataRow = ({ user, refetch, handleDelete }) => {
    console.log('user',user)
  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
  {user?.isBlocked !== undefined ? (
    <p
      className={`${
        user.isBlocked ? 'text-yellow-500' : 'text-green-500'
      } whitespace-no-wrap`}
    >
      {user.isBlocked ? 'Blocked' : 'Active'}
    </p>
  ) : (
    <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
  )}
</td>


      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm text-red-500'>
       <Delete onClick={() => handleDelete(user._id)}/>
       
        {/* Update User Modal */}
      </td>
    </tr>
  )
}



export default UserDataRow