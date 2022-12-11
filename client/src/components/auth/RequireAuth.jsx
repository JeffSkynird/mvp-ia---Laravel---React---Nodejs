import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function RequireAuth({ children }) {
  let dt = useAuth();
  let navigate = useNavigate();
 
  if (dt.usuario == null) {
    navigate("/login")
  } else {
    return children;
  }
}

export default RequireAuth;