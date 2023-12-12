import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import WriteModal from "./WriteModal";
import SideUserList from "./SideUserList";
import FloatingBtn from "./FloatingBtn";

const Layout = () => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <Sidebar setIsModal={setIsModal} />
      <SideUserList />
      <FloatingBtn />
      <Outlet />
      {isModal ? <WriteModal setIsModal={setIsModal} /> : null}
    </>
  );
};

export default Layout;
