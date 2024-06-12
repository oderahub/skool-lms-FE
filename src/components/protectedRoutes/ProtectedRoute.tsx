import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { login, clearUserDetails } from "../../states/userDetails/userDetailsSlice";

interface ProtectedRouteChildren {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteChildren) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function checkToken() {
      try {
        const res = await axiosInstance.get("/protected-route");

        if (res.status === 200 && res.data.user) {
          dispatch(login(res.data.user));
        } else {
          navigate("/login");
          localStorage.removeItem("token");
          dispatch(clearUserDetails());
          
        }
      } catch (error) {
        console.error("Error checking token:", error);
        navigate("/login");
      }
    }

    // Check token only if it exists
    if (token) {
      checkToken();
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, token]);

  return <>{children}</>;
}
