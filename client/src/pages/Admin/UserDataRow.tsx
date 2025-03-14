
const UserDataRow = ({ user, refetch }) => {
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


      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
          <span
            aria-hidden='true'
            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
          ></span>
          <span className='relative'>Update Role</span>
        </span>
        {/* Update User Modal */}
      </td>
    </tr>
  )
}



export default UserDataRow