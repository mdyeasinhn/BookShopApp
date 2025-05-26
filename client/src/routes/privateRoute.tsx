/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";

// Define the expected structure of your decoded user token
interface DecodedUser {
  role: string;
  email: string;
  name?: string;
  [key: string]: any; // Optional if token may contain other fields
}

type TProtectedRoute = {
  children: ReactNode;
  role?: string;
};

const PrivateRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);
  let user: DecodedUser | null = null;

  if (token) {
    // @ts-ignore
    user = verifyToken(token) as DecodedUser;
    console.log("User from token:", user);
  }

  if (!token || (role && user?.role !== role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
