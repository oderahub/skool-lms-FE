import decagonLogo from "/images/decagon-logo.png";
import leftArrow from "/images/left-arrow.png";
import { HiOutlineChatAlt } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserDetails } from "../../states/userDetails/userDetailsSlice";
import socket from "../../../socket";


interface Header{
  header_text: string;
  linkTo: string;
}

function AdminHeader( {header_text, linkTo}: Header) {

  const user = useSelector((state: RootState) => state.userDetails);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    // Listen for incoming messages from the socket
    socket.on("message", () => {
    
      setCount((prevCount) => prevCount + 1);
    });

    // Cleanup function to remove event listener
    return () => {
      socket.off("message");
    };
  }, []);




  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearUserDetails());
    window.history.replaceState(null, "", "/login");
    
    if (user) {
      socket.emit("offline", user.userId);
  }
 
    navigate("/login");
  };

  return (

    <div className="w-10/12 mx-auto">
      <div className="flex justify-between items-center">
        <img src={decagonLogo} alt="Decagon logo" />

        <div className=" flex justify-between gap-4 items-center">
          <div className=" font-semibold text-base">Contact Us</div>
          <Link to={'/admin/messages'} className=" text-white no-underline">
          <div className=" relative">
                <HiOutlineChatAlt fontSize={26} color="black" />
                {count > 0 && (
                    <span className=" absolute top-0.5 right-1 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-white text-xs">
                      {count}
                    </span>
                  )}

                </div>
          </Link>

          <div className="flex justify-center items-center gap-2">

          <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2  flex justify-center items-center text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 gap-2">
              <span className="sr-only">Open user menu</span>

              <div className=" bg-blue-400 text-blue-600 rounded-full w-8 h-8 flex justify-center items-center">
                <p className="font-semibold text-base">
                  {user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
                </p>
              </div>

              <div className=" font-normal text-base">{user.firstName}</div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute left-0 mt-2 w-48 rounded-sm p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none shadow-lg">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-white",
                      "rounded-sm px-4 py-2 text-blue-600"
                    )}
                  >
                    {user.firstName + " " + user.lastName}
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <div
                  className={classNames(
                    active && "bg-gray-100",
                    "active:bg-gray-200 rounded-sm px-4 py-2  cursor-pointer focus:bg-gray-200"
                  )}
                  >
                    <Link to={`/admin/new_course`} className=" no-underline text-gray-700 hover:no-underline">
                    Add Course
                    </Link>
                     
                  </div>
                )}
              </Menu.Item>


              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={logout}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Logout
                  </div>
                )}
              </Menu.Item>

            </Menu.Items>
          </Transition>
        </Menu>

          

          </div>
        </div>
      </div>

      <div className=" mt-6">
        <Link className=" flex gap-1 text-black" to={linkTo}>
          <img src={leftArrow} alt="Arrow to go back to the previous page" />
          <div>{header_text}</div>
        </Link>
      </div>



    </div>
  )
}

export default AdminHeader