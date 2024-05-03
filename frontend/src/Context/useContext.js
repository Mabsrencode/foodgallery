import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import LoadingModal from "../Components/LoadingModal/LoadingModal.jsx";

const UserContext = createContext();
export const UserProvider = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const verifyCookie = async () => {
      setLoading(true);

      const { data } = await axios.post("/auth", {}, { withCredentials: true });
      if (!data.status) {
        return navigate("/") && window.location.reload();
      }
      setUser(data);
      localStorage.setItem("fg-username", data.user);
      setLoading(false);
      if (!data.status) {
        localStorage.clear("fg-username");
      }
      return !data.status && removeCookie("token");
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return (
    <UserContext.Provider value={user}>
      {loading ? (
        <>
          <LoadingModal />
        </>
      ) : (
        <Outlet />
      )}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
