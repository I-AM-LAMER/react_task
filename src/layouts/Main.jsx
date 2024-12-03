import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../components/app/slices/authSlice"
import { set_user, remove_user } from "../components/app/slices/userSlice";
import checkToken from "../components/app/helper/checkToken";


const MainLayout = () => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
      checkToken().then((data) => {
        if (data) {
          dispatch(login());
          dispatch(set_user(localStorage.getItem('firstName')));
        } else {
          dispatch(logout());
          dispatch(remove_user());
        }
        setIsLoading(false);
      });
    }, []);
    return isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <main>
          <Outlet />
        </main>
      );
};

export default MainLayout