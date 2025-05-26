import { useDeleteUserMutation, useGetAllUsersQuery } from "@/redux/features/users/usersMangementApi";
import UserDataRow from "./UserDataRow";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { toast } from "sonner";
import { IUser } from "@/types/user.type";

const ManageUsers = () => {
  //@ts-ignore
  const { data: response, refetch, isLoading } = useGetAllUsersQuery(undefined);
  const users = response?.data || [];

  const [deleteUser] = useDeleteUserMutation();
  if (isLoading) {
    return <LoadingSpinner smallHeight={false} />
  }
  const handleDelete = async (id?: string) => {
    try {
      const res = await deleteUser(id).unwrap();
      toast.success(res?.message);
      refetch()
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to user book. Please try again.");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* User data table row */}
                  {users.map((user :IUser) => (
                    //@ts-ignore
                    <UserDataRow key={user.id} user={user} refetch={refetch} handleDelete={handleDelete} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
