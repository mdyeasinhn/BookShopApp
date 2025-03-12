import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useGetUserByEmailQuery } from '@/redux/features/users/usersMangementApi';
import { useAppSelector } from '@/redux/hooks';
import { useState } from 'react'


const Profile = () => {
    const user = useAppSelector(selectCurrentUser);
    const { data: userData , isLoading} = useGetUserByEmailQuery(user?.email);
    console.log(userData)

  const [isEditOpen, setIsEditModalOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

 
  //   loading spinner
  if ( isLoading) return <LoadingSpinner />
  return (
    <div className='flex justify-center items-center h-screen '>
   
      <div className='bg-white shadow-lg rounded-2xl w-full lg:w-3/5  '  >
        <img
          alt='profile'
          src='https://wallpapercave.com/wp/wp10784415.jpg'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={userData?.data?.photo}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 px-4 text-xs text-white bg-pink-500 rounded-full uppercase'>
            {userData.data.role}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {userData.data?._id.slice(0, 8)}...
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='sm:flex lg:flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <div className='flex justify-around gap-12 '>
                <p className='flex flex-col'>
                  Name
                  <span className='font-bold text-black '>
                    {userData?.data.name}
                  </span>
                </p>
                <p className='flex flex-col'>
                  Email
                  <span className='font-bold text-black '>{userData?.data.email}</span>
                </p>
              </div>

              <div className='mt-6 flex justify-center '>
                <button className='bg-[#F43F5E]  px-10 py-1 rounded-xl text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                  Update Profile
                </button>
                {/* <UpdateUserInfoModal isOpen={isEditOpen} setIsEditModalOpen={setIsEditModalOpen} /> */}


                {/* <button onClick={()=> setIsOpen(true)}  className='bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                  Change Password
                </button>
                <ChangePassModal isOpen={isOpen}  setIsOpen={setIsOpen}/> */}

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile