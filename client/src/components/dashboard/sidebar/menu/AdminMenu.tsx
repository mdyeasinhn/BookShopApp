import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { MdHomeWork } from 'react-icons/md'
const AdminMenu = ({ closeSidebar }) => {
    return (
        <>
        
            <MenuItem
                closeSidebar={closeSidebar}
                icon={MdHomeWork}
                label="Create Book"
                address="add-book"
            />
            <MenuItem
                closeSidebar={closeSidebar}
                icon={MdHomeWork}
                label="All Books"
                address="all-books"
            />
            <MenuItem closeSidebar={closeSidebar} icon={FaUserCog} label='Manage Users' address='manage-users' />
        </>
    )
}

export default AdminMenu