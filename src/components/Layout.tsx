import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import WriteModal from "./WriteModal";

const Layout = () => {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <Sidebar setIsModal={setIsModal} />
      <Outlet />
      {isModal ? <WriteModal setIsModal={setIsModal} /> : null}
    </>
  );
};

export default Layout;
