import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./UserLayout.css";
import { useAuth } from "../context/useAuth";
import SideMenu from "../components/SideMenu";
import navigation from "../navigation";

const UserLayout = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  const currentPage = navigation().find(
    (item) => `/${item.path}` === location.pathname
  );
  const pageName = currentPage ? currentPage.title : "Resource Management";
  console.log(pageName);

  return (
    <>
      {isLoggedIn() ? <SideMenu /> : null}
      <div
        className={`container ${isLoggedIn() ? "logged-in" : "not-logged-in"}`}
      >
        <Navbar pageName={pageName} />
        <div className="content-container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default UserLayout;
