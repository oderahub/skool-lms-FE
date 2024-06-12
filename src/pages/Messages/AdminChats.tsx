
import React, { useState, useEffect } from "react";
import AdminChatbox from "../../components/chat/Admin/AdminChatbox";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"
import socket from "../../../socket";
import { TbMessagesOff } from "react-icons/tb";

interface Chat {
  createdAt: string;
  id: string;
  message: string;
  receiver: {id: string, firstName: string, lastName: string};
  sender: {id: string, firstName: string, lastName: string};

}

const AdminChat: React.FC = () => {


  const [chats, setChats] = useState<Chat[]>([]);
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
   

  const recipientId = searchParams.get('id');
  console.log("recipientId: ", recipientId);

  const userId = useSelector((state: RootState) => state.userDetails.userId);

  useEffect(() => {

    setLoading(true);
    
    const fetchChats = async () => {
      try {
        
        const response = await axiosInstance.get(`/users/chats/${recipientId}/${userId}`, {
        });

        if(response.data.conversation || response.data.recipient){
            console.log("response.data: ", response.data);
          setChats(response.data.conversation);
          setRecipient(response.data.recipient.firstName + " " + response.data.recipient.lastName)
        }
        else{
          setChats([]);
          setRecipient('')
        }        
        
      } catch (error) {
        console.error("Failed to fetch chats", error);
      }
      finally {
        setLoading(false); // Update loading state after fetching chats
      }
    }

    if(recipientId){
      fetchChats();
    }
    else{
      setLoading(false);
      setChats([]);
      setRecipient('')
      
    }

    socket.on("connect", () => {


      socket.emit("addNewUser", userId);

      return () => {
        socket.disconnect(); // Clean up WebSocket connection
      };
    })
  }, [recipientId])

  useEffect(() => {
    // Subscribe to incoming messages from the server
    socket.on("message", (message: Chat) => {
      setChats((prevChats) => [...prevChats, message]);
    });

    return () => {
      // Unsubscribe from socket events when component unmounts
      socket.off("message");
    };
  }, []);


  return (
    <>
    <div>

      {
        loading ? (
          <section className=" flex justify-center items-center h-[37.5rem] w-full bg-white p-1 mx-auto rounded-2xl rounded-l-none ">
         
          <div className="animate-pulse flex gap-10">
            <div className="bg-[#27AE60] h-5 w-5 rounded-full mx-1"></div>
            <div className="bg-[#27AE60] h-5 w-5 rounded-full mx-1"></div>
            <div className="bg-[#27AE60] h-5 w-5 rounded-full mx-1"></div>
            <div className="bg-[#27AE60] h-5 w-5 rounded-full mx-1"></div>
            <div className="bg-[#27AE60] h-5 w-5 rounded-full mx-1"></div>
          </div>
        
        </section>
        ) : 
        (
          chats.length === 0 ? (
            <section className=" flex justify-center items-center h-[37.5rem] bg-white rounded-l-none rounded-2xl ">

              <div className=" h-full flex flex-col gap-10 items-center justify-center rounded-2xl rounded-l-none ">
            <p className="text-gray-300 text-3xl font-semibold">No conversation selected yet</p>
            <TbMessagesOff className="h-[6rem] w-[8rem] text-gray-300 animate-bounce ease-in-out" />

          </div>

            </section>
            
          ) :

          <AdminChatbox chats={chats} recipient={recipient} />
        )
      
    }
    
    </div>
    </>
  );

};

export default AdminChat;
