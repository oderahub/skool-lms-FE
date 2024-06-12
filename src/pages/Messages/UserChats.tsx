
import { useState, useEffect } from "react";
import UserChatbox from "../../components/chat/User/UserChatbox";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store"
import socket from "../../../socket";

interface Chat {
  createdAt: string;
  id: string;
  message: string;
  receiver: {id: string, firstName: string, lastName: string};
  sender: {id: string, firstName: string, lastName: string};

}

const UserChat = ({adminId}:{adminId: string}) => {


  const [chats, setChats] = useState<Chat[]>([]);
  const [recipient, setRecipient] = useState('');
  const [loading, setLoading] = useState(true);
 

  // const recipientId = searchParams.get('id');
  const recipientId = adminId
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

          console.log("recipient", response.data.recipient)
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
    <div className=" w-full">

      {
        loading ? (
          <section className=" flex justify-center items-center h-[27.5rem] w-full bg-white mx-auto ">
         
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
          <UserChatbox chats={chats} recipient={recipient} recipientId={recipientId} />
        )
      
    }
    
    </div>
    </>
  );

};

export default UserChat;
