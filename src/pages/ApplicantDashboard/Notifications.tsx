import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import axiosInstance from "../../utils/axiosInstance";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { updateNotificationCount } from "../../states/notification/notificationSlice";

interface Notification {
  id: string;
  title: string;
  message: string;
  status: boolean;
  createdAt: string;
}

const NotificationPage = () => {

  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for modal visibility
  const [notificationToDelete, setNotificationToDelete] = useState<string | null>(""); // State to store id of notification to delete

  const openDeleteModal = (id: string) => {
    setNotificationToDelete(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setNotificationToDelete(null);
  };

  const deleteNotification = async () => {

    if (notificationToDelete !== null) {
      try {
        const response = await axiosInstance.delete(`users/notification/${notificationToDelete}`, {
          withCredentials: true,
        });

        if (response.data.successMessage) {

          const updatedNotifications = notifications.filter(
            (notification) => notification.id !== notificationToDelete
          );

          setNotifications(updatedNotifications);

          closeDeleteModal();
          
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  

  const markAsRead = async (id: string) => {
    try {

      const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, status: notification.status ? false : true }
        : notification
    );

    setNotifications(updatedNotifications);

    const unreadCount = updatedNotifications.filter(
      (notification) => !notification.status
    ).length;

    dispatch(updateNotificationCount(unreadCount));

      const updatedNotification = updatedNotifications.find(notification => notification.id === id);

    await axiosInstance.put(
      `users/notification/${id}`,
      {
        status: updatedNotification!.status
      },
      {
        withCredentials: true,
      }
    );

  } catch (error) {
    console.error(error);
  }
  };

  

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/users/notifications", {
          withCredentials: true,
        });

        if (response.data.notifications) {
          setNotifications(response.data.notifications);
        }
      } catch (error) {
        console.error(error);
      }
      finally {
        setLoading(false);
      }

    };

    fetchNotifications();
  }, []);

  return (
    <div className="w-10/12 mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>


      {loading ? (
        <div className="flex items-center justify-center">
          <div className=" mt-40 w-20 h-20 border-t-4 border-b-4 border-green-600 rounded-full text-center animate-spin"></div>
        </div>
      ) : (
      <>
      {notifications.length !== 0 ? (

        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`pr-4 pl-2 py-4 rounded-lg text-[0.75rem] border border-green-600 hover:border-2 hover:border-green-600  ${
                notification.status
                  ? " bg-gray-100"
                  : " bg-green-100"
              }`}
            >
              <div className="flex justify-between items-center ">

                <div className=" flex gap-2 items-center  w-[95%]">
                  <div className="relative w-[10%]">
                    {!notification.status ? (
                      <button
                        className="text-gray-500 hover:text-blue-500 flex flex-col justify-center items-center group mx-auto "
                        onClick={() => markAsRead(notification.id)}
                      >
                        <IoCheckmarkDoneSharp className="w-5 h-5 " />
                        <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-none w-[5rem] text-[0.7rem] transition-opacity duration-300">
      Mark as read
    </span>
                      </button>
                    ) : (
                      <button
                        className="text-gray-500 hover:text-blue-500 flex flex-col justify-center items-center w-[3rem] group mx-auto"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <IoCheckmarkDoneSharp className="w-5 h-5" />
                        <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-none w-[7rem] text-[0.7rem] transition-opacity duration-300">
      Mark as unread
    </span>
                      </button>
                    )}
                  </div>

                  <div className=" flex gap w-full justify-between items-center ">

                    <div className=" w-[80%] pr-4">
                      <div>{notification.title}:</div>

                      <span>{notification.message}</span>
                    </div>

                    <div className="text-gray-500 px-2 w-[20%] text-right">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center  ">
                  <button
                    className="text-red-400 hover:text-red-600 flex flex-col justify-center items-center gap-1 "
                    onClick={() => openDeleteModal(notification.id)}
                  >
                    <FaRegTrashAlt className="w-4 h-4" />
                  </button>
                </div>


              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="text-2xl font-semibold">No notifications available</p>
        </div>
      )}
      </>

      )}

{showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center z-50">
          <div className="bg-white p-8 rounded-lg mt-[7rem] h-[10rem]">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this notification?</p>
            <div className="flex justify-end gap-6">
              <button className="mr-2 text-gray-500 hover:bg-gray-500 hover:text-white py-2 px-4 rounded-xl" onClick={closeDeleteModal}>Cancel</button>
              <button className="text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded-xl" onClick={deleteNotification}>Delete</button>
            </div>
          </div>
        </div>
      )}




    </div>
  );
};

export default NotificationPage;
