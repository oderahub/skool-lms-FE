import classNames from "classnames";
import { Link, useLocation, useNavigate } from "react-router-dom";
import decagonLogo from "/images/decagon-logo.png";
import { HiOutlineLogout } from "react-icons/hi";
import { clearUserDetails } from "../../../states/userDetails/userDetailsSlice";
import socket from '../../../../socket';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";

import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../../lib/constants"; //The dashboard sidebar links are imported from the constants file

const linkClass =
  "flex items-center gap-4 px-3 py-2 hover:bg-green-600/50 hover:text-white hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.userDetails);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearUserDetails());
    window.history.replaceState(null, "", "/login");
 
    navigate("/login");

    if (user) {
      socket.emit("offline", user.userId);
  }
  };

  return (
    <div className="bg-white  w-60 p-3 flex flex-col">
      <div className="flex items-center gap-2 px-1 py-3">
        <img src={decagonLogo} />
      </div>

      <div className="text-stone-950 pl-3 mt-2 text-lg">
        {" "}
        Applicant Dashboard
      </div>
      <div className="py-8 flex flex-1 flex-col z-10 gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>

      <div className="flex flex-col text-stone-950 gap-0.5 pt-2 border-t border-neutral-700">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div
          onClick={logout}
          className={classNames(linkClass, "cursor-pointer text-red-500")}
        >
          <button className="text-xl">
            <HiOutlineLogout />
          </button>
          Logout
        </div>
      </div>
    </div>
  );
}

//declaring types for the link props
type LinkProps = {
  path: string;
  icon: React.ReactNode;
  label: string;
};

// This function control the linking on the dashboard sidebar
function SidebarLink({ link }: { link: LinkProps }) {
  const { pathname } = useLocation();
  const basePath = link.path.split("?")[0];

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === basePath ? "bg-green-600 text-white" : "text-neutral-400",
        linkClass
      )}
    >
      <span className="text-xl">{link.icon}</span>
      {link.label}
    </Link>
  );
}
