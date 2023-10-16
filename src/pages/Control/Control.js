import { Outlet } from "react-router-dom";
import Sidebar from "../../components/SideBar";
const Control = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default Control;
