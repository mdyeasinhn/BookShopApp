import { RiAlignItemLeftLine } from "react-icons/ri";
import MenuItem from "./MenuItem";


const UserMenu = ({ closeSidebar }) => {
    return (
        <>
            <MenuItem
                closeSidebar={closeSidebar}
                icon={RiAlignItemLeftLine}
                label="My Order"
                address="my-orders"
            />
        </>
    );
};

export default UserMenu;