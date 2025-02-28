import { selectCurrentToken} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate} from "react-router-dom";

type TProtectedRoute = {
    children: ReactNode;
    role: string | undefined;
  };
  

  const PrivateRoute = ({ children, role }: TProtectedRoute) => {
    const token = useAppSelector(selectCurrentToken);
    let user;
    if (token) {
      user = verifyToken(token);
    }
    if (role !== undefined && role !== user?.role) {
      return <Navigate to="/login" replace={true} />;
    }
  
    if (!token) {
      return <Navigate to="/login" replace={true} />;
    }
    return children;
  };

export default PrivateRoute;