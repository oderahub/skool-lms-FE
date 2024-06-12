import  { useRef, useState, useEffect} from "react";
import EmojiPicker from "emoji-picker-react";
import MicrophoneButton from "../User/microphone";
import { BsEmojiSmile } from "react-icons/bs";
import axiosInstance from "../../../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import  chatTail from '/images/chatbox-tail.png'
import chatTailTwo from '/images/chatbox-tail2.png'
import { TbMessagesOff } from "react-icons/tb";
import socket from '../../../../socket'

interface Chat {
  createdAt: string;
  id: string;
  message: string;
  receiver: { id: string; firstName: string; lastName: string };
  sender: { id: string; firstName: string; lastName: string };
}

interface Message {
  text: string;
  timestamp: string;
  senderId: string;
  receiverId: string;
  dayTag?: string | null;
}

const AdminChatbox = ({ chats, recipient }: { chats: Chat[]; recipient: string;}) => {
  console.log("chats: ", chats, recipient);

  const [emojiPickerState, setEmojiPickerState] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const [chosenEmoji, setChosenEmoji] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [searchParams] = useSearchParams();
  const recipientId = searchParams.get("id");
  const userId = useSelector((state: RootState) => state.userDetails.userId);
 
  
  useEffect(() => {
    setMessages(chats.map((chat, index) => {
      const chatDate = new Date(chat.createdAt);

      const previousMessageDate = index > 0 ? new Date(chats[index - 1].createdAt) : null;

      let dayTag: string | null = null;
      
      if (index === 0) {
        // Special case for the first message
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
        dayTag = chatDate.toLocaleDateString('en-US', options);
      } else {
        // For subsequent messages, compare with the previous message
        // const previousMessageDate = new Date(chats[index - 1].createdAt);

        console.log("prevmessagedate", previousMessageDate?.getDate(), chatDate.getDate());
    
        if (chatDate.getDate() !== previousMessageDate?.getDate()) {
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const;
          dayTag = chatDate.toLocaleDateString('en-US', options);
        }
      }

      chatDate.setHours(chatDate.getHours() + 1);
      return {
        text: chat.message,
        timestamp:
          chatDate.getUTCHours().toString().padStart(2, "0") +
          ":" +
          chatDate.getUTCMinutes().toString().padStart(2, "0"),
        senderId: chat.sender.id,
        receiverId: chat.receiver.id,
        dayTag: dayTag
        
      };
    }));

        
  }, [chats, socket]);
  

  useEffect(() => {
    
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [recipientId, chats, messages]);

  

  useEffect(() => {
    // Subscribe to incoming messages from the server
    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Unsubscribe from socket events when component unmounts
      socket.off("message");
    };
  }, [recipientId, chats, messages]);


  const sendMessage = async () => {
    if (inputValue.trim() !== "") {

      const message = {
        text: inputValue,
        timestamp: (() => {
          const currentDate = new Date();
          currentDate.setHours(currentDate.getHours() + 1); // Add 1 hour for Nigerian time
          return (
            currentDate.getUTCHours().toString().padStart(2, "0") +
            ":" +
            currentDate.getUTCMinutes().toString().padStart(2, "0")
          );
        })(),
        senderId: userId || "",
        receiverId: recipientId || "",
      };

      socket.emit("sendMessage", message);
      setMessages([...messages, message]);
      setInputValue("");
      setChosenEmoji("")

      try {
        await axiosInstance.post("/users/messages/chats", message);
      } catch (error) {
        console.error("Failed to send message", error);
      }

      ;
    }
  };

  function onEmojiClick(emoji: any) {
    const selectedEmoji = emoji.emoji;

    setChosenEmoji(selectedEmoji);

    if (chosenEmoji) {
      setInputValue(inputValue + chosenEmoji.toString());
    }
  }


  const handleClickOutside = (event: any) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
      setEmojiPickerState(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    } 
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <> 
    <div className=" overflow-y-auto w-full bg-white rounded-2xl rounded-l-none border-none h-[37.5rem]">
      <div className=" px-2">
        <header className="py-2 px-2 items-center border-b-2 border-gray-300">
          <div className="flex flex-col items-center">
            <img
              src="/images/ChatAvater.png"
              className="h-2 sm:h-10"
              alt="Chat Avatar"
            />
                <p className="text-sm text-gray-700 ml-2">{recipient}</p>
            
          </div>
        </header>

        <div className="overflow-y-auto px-6 pb-6 h-[28.6rem] " ref={chatContainerRef}>
        {messages.length === 0 ? (
          <div className="flex flex-col gap-6 justify-center items-center h-full mt-6">
            <p className="text-gray-500">No messages yet</p>
            <TbMessagesOff className="h-20 w-20 text-gray-500 animate-bounce ease-in-out" />

          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const isSender = message.senderId === userId;
              const senderMessage = isSender ? message.text : "";
              const receiverMessage = !isSender ? message.text : "";
              const senderTime = isSender ? message.timestamp : "";
              const receiverTime = !isSender ? message.timestamp : "";

              return (
                <div key={index} className="">
                  {message.dayTag && (
                    <div className="flex justify-center my-10">
                      <div className="bg-gray-200 px-2 py-1 rounded-lg text-xs text-gray-600">
                        {message.dayTag}
                      </div>
                    </div>
                  )}

                  {!isSender && (
                    <div className="mt-3 flex justify-start relative">
                      <div className="flex justify-start py-2 px-4 bg-[#E6E5EB] rounded-xl shadow-md max-w-[70%]">
                      <div className="flex flex-col w-full  gap-1 ">
                          <p className="text-black font-normal text-sm">
                            {receiverMessage}
                          </p>
                          <div className=" flex justify-end items-center">
                            <p className="flex justify-end text-[10px] text-gray-600 font-semibold">
                              {receiverTime}
                            </p>
                          </div>
                        </div>
                      </div>
                      <img className=" absolute bottom-0 -left-[5px] w-4 h-3" src={chatTailTwo}/>
                    </div>
                  )}
                  {isSender && (
                    <div className="mt-3 flex justify-end relative ">
                      <div className=" shadow-md flex py-2 px-3 bg-[#27AE60] rounded-xl max-w-[70%]">
                        <div className="flex flex-col w-full gap-1">
                          <p className="text-white font-normal text-sm">
                            {senderMessage}
                          </p>
                          <div className=" flex justify-end items-center">
                            <p className="flex justify-end text-[10px] text-gray-600 font-semibold">
                              {senderTime}
                            </p>
                          </div>
                        </div>
                      </div>
                      <img className=" h-2 absolute bottom-0 right-0" src={chatTail}/>
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
        </div>


        <div className="mt-0 border-t-2 border-gray-200 ">

          <div className="relative flex items-center justify-between gap-3 p-2 mt-1 ">

            <MicrophoneButton />

            <textarea
                placeholder="Type your message"
                className="flex-grow py-2 px-4 pr-20 border rounded-lg bg-[#27AE60] text-white placeholder:text-white "
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => handleKeyDown(e)}
                rows={1} 
                style={{ resize: "none" }} 
              />

            <button
              className=" flex items-center justify-center"
              onClick={sendMessage}
            >
              <img src="/images/Vector.png" alt="send-icon" />
            </button>

            <button
              className="absolute right-[3.5rem] text-white font-extrabold text-xl"
              onClick={() => setEmojiPickerState(!emojiPickerState)}
            >
              <BsEmojiSmile />
            </button>

            <button className="absolute right-[5.5rem]">
              <img src="/images/Photo copy.png" />
            </button>

            {emojiPickerState && (
              <div ref={emojiPickerRef} className=" absolute right-0 w-9/10  -top-[26rem]">
              <EmojiPicker
                width="100%"
                height={420}
                lazyLoadEmojis={true}
                onEmojiClick={onEmojiClick}
                
              />
              </div>
            )}

          </div>
          
          
        </div>
      </div>
    </div>
  
    </>
    
  );
};

export default AdminChatbox;
