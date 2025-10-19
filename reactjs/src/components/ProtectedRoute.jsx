import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/Appcontext";

export default function ProtectedRoute({ children }) {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
