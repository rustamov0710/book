import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  auth: boolean;
}

export function PrivateRoute({ children, auth }: PrivateRouteProps) {
  return auth ? <>{children}</> : <Navigate to="/signin" />;
}
