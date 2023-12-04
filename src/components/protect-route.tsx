import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const user = auth.currentUser;
  if (!user) {
    return <Navigate to={"/login"} />;
  } else {
    return children;
  }
};

export default ProtectRoute;
