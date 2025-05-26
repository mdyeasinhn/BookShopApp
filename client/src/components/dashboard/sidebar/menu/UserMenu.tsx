import { FC } from "react";
import { RiAlignItemLeftLine } from "react-icons/ri";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  closeSidebar: () => void;
}

const UserMenu: FC<UserMenuProps> = ({ closeSidebar }) => {
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
