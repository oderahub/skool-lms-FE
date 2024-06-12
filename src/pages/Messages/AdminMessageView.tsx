import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,

} from "../../states/messages/messagesSlice";
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { RootState } from "../../store/store";
import AdminChat from "./AdminChats";
import AdminHeader from "../../components/admin/AdminHeader";
import socket from '../../../socket';
import { MdClear } from "react-icons/md";

interface Chats {
  id: string;
  passportUpload: string;
  firstName: string;
  lastMessage: string;
  lastMessageCreatedAt: string;
  online: boolean;
}

interface OnlineUser {
  userId: string;
  socketId: string;
}

const AdminMessageView: React.FC = () => {
  const userId = useSelector((state: RootState) => state.userDetails.userId);
  const [chattingUsers, setChattingUsers] = useState<Chats[]>([]);
  const [originalUsers, setOriginalUsers] = useState<Chats[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  


  useEffect(() => {
    socket.on("onlineUsers", (users:OnlineUser[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, [socket]);

 

  const isUserOnline = (recipientId: string) => {
    return onlineUsers.some((user) => user.userId === recipientId);
  };

  const activate = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle active state
  };

  

  useEffect(() => {

    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`/users/messages/${userId}`);
        
        const sortedUsers = response.data.users.sort((a: Chats, b: Chats) => {
          return new Date(b.lastMessageCreatedAt).getTime() - new Date(a.lastMessageCreatedAt).getTime();
        });
        setChattingUsers(sortedUsers);
        setOriginalUsers(sortedUsers);
        
      } catch (error) {
        console.error("Failed to fetch messages", error);
      } finally {
        setLoading(false);
      }
    };
   
    setLoading(true);
    fetchMessages();
  }, [userId, socket]);

  // Function to format the timestamp
const formatTimestamp = (timestamp: string) => {
  const messageDate = new Date(timestamp);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - messageDate.getTime();

  // Check if the message was sent within the last 24 hours
  if (timeDifference < 24 * 60 * 60 * 1000) {
    
    const elapsedHours = Math.floor(timeDifference / (60 * 60 * 1000));
    const elapsedMinutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));

    if (elapsedHours > 0) {
      return `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''} ago`;
    } else {
      return `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''} ago`;
    }
  } else if (timeDifference < 48 * 60 * 60 * 1000) {
    return "Yesterday";
  } else {
    
    const formatter = new Intl.DateTimeFormat('default', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC' 
    });
    const [{ value: day }, , { value: month }, , { value: year }] = formatter.formatToParts(messageDate);
    return `${day}/${month}/${year}`;
  }
};


// useEffect(() => {
//   const handleClickOutside = (event: MouseEvent) => {
//     if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//       setSearchValue("");
//       dispatch(setSearchQuery(""));
//       // Reset chattingUsers to the original state
//       setChattingUsers(originalUsers);
//     }
//   };

//   document.addEventListener("mousedown", handleClickOutside);

//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, [dispatch, userId]);
  

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setSearchValue(value);
    dispatch(setSearchQuery(value));
    handleSearch(value);
  };



  useEffect(() => {
    
    handleSearch(searchValue);

  }, [searchValue, originalUsers]);


  const handleSearch = (searchValue: string) => {
    if (searchValue.trim() === "") {
      // If search box is empty, display original list of users
      setChattingUsers(originalUsers);
    } else {
      // Filter original users list based on search value
      const filteredUsers = originalUsers.filter((user) => {
        return (
          user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
          user.lastMessage.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setChattingUsers(filteredUsers);
    }
  };

  const handleSearchClear = () => {
    setSearchValue(""); // Clear search value
    setChattingUsers(originalUsers); // Reset to original list of users
  };

  return (
    <>
    <section className=" mt-8">
    <AdminHeader header_text="Back to dashboard" linkTo="/admin/applications-section" />
    </section>
    
    <main className="flex w-10/12 mx-auto h-[38rem] bg-white mt-5">

    <section className=" w-4/12 py-2  border-4 border-green-600 rounded-2xl border-r-0 rounded-r-none transition-all duration-300 overflow-y-auto bg-white relative">
      <div className=" w-full top-0 z-10 sticky px-5 border-b-4 border-b-gray-200 bg-white">
        <h2 className=" text-2xl text-black font-semibold px-4 ">Messages</h2>
        
        <div className="relative mt-3 mb-6 flex items-center ">
          <input
            ref={searchRef}
            type="text"
            id="Search"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => handleSearchChange(e)}
            className="w-full rounded-2xl border-gray-200 py-2 pr-10 shadow-sm sm:text-md px-5 bg-green-600/10 focus:border-2 focus:border-green-600 focus:outline-none"
          />
          {searchValue && (
  <button onClick={handleSearchClear} className=" absolute right-3 text-black"><MdClear /></button>
)}
        </div>

      </div>
      {loading ? (
        <div className="flex items-center justify-center mt-40 px-4">
          <div className="w-20 h-20 border-t-4 border-b-4 border-green-600 rounded-full text-center animate-spin"></div>
        </div>
      ) : (
          <div className=" py-2 flex flex-col px-2">
        {chattingUsers.length > 0 ? (
          chattingUsers.map((message, index) => {
            const chatDate = new Date(message.lastMessageCreatedAt);
            chatDate.setHours(chatDate.getHours() + 1);
            // const timestamp =
            //   chatDate.getUTCHours().toString().padStart(2, "0") +
            //   ":" +
            //   chatDate.getUTCMinutes().toString().padStart(2, "0");

            return (
              <Link
                className={`hover:no-underline px-2 hover:bg-green-600/10 ${
                  activeIndex === index ? "bg-green-600/20 rounded-lg" : ""
                } `}
                to={`/admin/messages?id=${message.id}`}
                key={index}
                onClick={() => activate(index)}
              >
                <div style={{ cursor: "pointer" }}>
                  <Message
                    imageUrl={message.passportUpload}
                    name={message.firstName}
                    message={ message.lastMessage.slice(0, 40) + `${message.lastMessage.length > 40 ? "..." : ""}`}
                    time={formatTimestamp(message.lastMessageCreatedAt)}
                    online={isUserOnline(message.id)}
                  />
                </div>
              </Link>
            );
          })
        ) : (
          <div className=" h-full w-full flex justify-center items-center">
            <div>
            No users found
            </div>
            </div>
        )}
      </div>
      
      )}
    </section>

    <section className=" bg-green-600 w-8/12  rounded-2xl p-1 rounded-l-none transition-all duration-300">
      <AdminChat />
    </section>

    </main>
    </>
  );
};

export default AdminMessageView;





