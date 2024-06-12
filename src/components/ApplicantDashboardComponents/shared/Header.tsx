import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { HiOutlineBell, HiOutlineChatAlt } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/store";
import axiosInstance from "../../../utils/axiosInstance";
import { FaCircle } from "react-icons/fa";
import { BiNotificationOff } from "react-icons/bi";
import { updateNotificationCount } from "../../../states/notification/notificationSlice";
import { clearUserDetails } from "../../../states/userDetails/userDetailsSlice";
import socket from '../../../../socket';


// import container from "postcss/lib/container";

interface Notification {
  id: number;
  title: string;
  message: string;
  status: boolean;
  createdAt: string;
}

export default function Header() {

 
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.userDetails);

  const count = useSelector(
    (state: RootState) => state.notificationStatus.notificationCount
  );
  const[messageCount, setMessageCount] = useState(0)
  const dispatch = useDispatch();

  const fetchCount = async () => {
    try {
      const {
        data: { notifications },
      } = await axiosInstance.get("/users/notification");


      const unreadNotifications: [] = notifications.filter(
        (notification: Notification) => !notification.status
      );
      
      setNotifications(unreadNotifications);
    

      dispatch(updateNotificationCount(unreadNotifications.length));
    } catch (error) {
      console.error("Failed to fetch notification:", error);
    }finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    try {
      await fetchCount();
    } catch (error) {
      console.error("Failed to fetch notification:", error);
    } finally {
      setLoading(false);
    }
  };



  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearUserDetails());
    window.history.replaceState(null, "", "/login");
 
    navigate("/login");

    if (user) {
      socket.emit("offline", user.userId);
  }


  };

  useEffect(() => {
    // Listen for incoming messages from the socket
    socket.on("message", () => {
    
      setMessageCount((prevMessageCount) => prevMessageCount + 1);
    });

    // Cleanup function to remove event listener
    // return () => {
    //   socket.off("message");
    // };

  }, [socket]);

  

  return (
    <div className="bg-white h-16 px-10 py-4 flex items-center border-b border-gray-200 justify-end">
      <div className="flex items-center gap-2 mr-2">
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <div className=" relative">
                <HiOutlineChatAlt fontSize={26} color="black" />
                {messageCount > 0 && (
                    <span className=" absolute top-0.5 right-1 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-white text-xs">
                      {messageCount}
                    </span>
                  )}

                </div>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 transform w-72">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                  <strong className="text-gray-700 font-medium">
                      Messages
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      This is the messages panel.
                    </div>

                    <button className=" mt-8 bg-blue-400 w-full text-center py-2 px-4 rounded-2xl text-white hover:bg-blue-500">
                      <Link to={'/admin/messages'} className=" text-white no-underline">  View all messages</Link>
                     </button>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <div className="inline-block relative" onClick={handleClick}>
                  <HiOutlineBell fontSize={26} color="black" />
                  {count > 0 && (
                    <span className=" absolute top-0.5 right-1 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-white text-xs">
                      {count}
                    </span>
                  )}
                </div>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-3 transform w-80">
                  <div className="bg-gray-100/90 rounded-xl shadow-md px-4 py-4 border-1 border-green-100">
                    <div className="text-black font-semibold mb-4 ">
                      Notifications
                    </div>
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className=" mt-4 w-6 h-6 border-t-4 border-b-4 border-green-600 rounded-full text-center animate-spin"></div>
                      </div>
                    ) : (
                      <>
                        {notifications.length !== 0 ? (
                          <>
                            <ul className="flex flex-col gap-4 mb-6 ">
                              {notifications.slice(0, 3).map(
                                (notification: Notification) => (
                                  <li
                                    className="px-2 py-1 border border-gray-600 rounded-lg text-sm hover:border-2 hover:border-green-600 bg-white text-gray-600 flex gap-4 items-center transition-all duration-300 ease-in-out hover:shadow-md hover:scale-105 hover:transform hover:translate-y-1"
                                    key={notification.id}
                                  >
                                    <div>
                                      <FaCircle className="text-green-600 h-3 w-3" />
                                    </div>
                                    <Link
                                      to="/dashboard/notifications"
                                      className=" no-underline hover:no-underline"
                                    >
                                      <h5 className=" font-medium text-gray-900">
                                        {notification.title}
                                      </h5>
                                      <p className=" text-gray-500">
                                        {notification.message.slice(0, 30)}.....
                                      </p>
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                            <div className=" w-full text-center bg-green-600 rounded-lg mx-auto py-2">
                              <Link
                                to="/dashboard/notifications"
                                className=" text-white no-underline"
                              >
                                See all notifications
                              </Link>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="mt-4 py-1 text-sm text-center">
                              <BiNotificationOff className="text-gray-500 h-10 w-10 mx-auto" />
                              No new notifications
                            </div>
                            <div className=" mt-10 w-full text-center bg-green-600 rounded-lg mx-auto py-2">
                              <Link
                                to="/dashboard/notifications"
                                className=" text-white no-underline"
                              >
                                See all notifications
                              </Link>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Menu as="div" className="relative">
          <div>
            <Menu.Button className="ml-2  flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>

              <div className=" bg-blue-400 text-blue-600 rounded-full w-10 h-10 flex justify-center items-center">
                <p className="font-semibold text-base">
                  {user.firstName.slice(0, 1) + user.lastName.slice(0, 1)}
                </p>
              </div>
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
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                    onClick={() => navigate("/dashboard/profile")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    My Profile
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/dashboard/settings")}
                    className={classNames(
                      active && "bg-gray-100",
                      "active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200"
                    )}
                  >
                    Settings
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
  );
}
