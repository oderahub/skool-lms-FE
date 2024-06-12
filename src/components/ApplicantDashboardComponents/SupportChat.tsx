
import {  useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { RiArrowUpSLine } from "react-icons/ri";


import UserChat from "../../pages/Messages/UserChats";

function SupportChat() {
  const [showChat, setShowChat] = useState(false);
  const [adminId, setadminId] = useState("");
  const [minimize, setMinimize] = useState(false);
  

  const handleClick = () => {
    setShowChat(!showChat);
    setadminId("dc93ecd9-ecac-4fa0-ae6e-fa34379b010f");
  };

  return (
    <>
      <section className={`${showChat ? "hidden" : "flex"} z-30 flex-col absolute bottom-[15%] right-4  w-2/12`}>
        <div className={`chat bg-green-600 rounded-xl shadow-md w-full py-1`}>
          <header className="text-white text-center mt-2 mb-2">
            Hey there! <br /> need some help?
          </header>

          <div>
            <div className="flex justify-center">
              <div className="btn transition-transform duration-200 ease-in-out transform hover:scale-110">
                <button
                  onClick={handleClick}
                  className="chat-btn bg-black p-2 rounded-xl text-white  w-full mb-2"
                >
                  Let’s chat now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="chat-icon w-full h-20 flex justify-end items-center mt-2">
          <button onClick={handleClick}>
            <img
              className="chat-logo transition-transform duration-200 ease-in-out transform hover:scale-110 mr-4"
              src="/images/Chat.png"
              alt="chat logo"
            />
          </button>
        </div>
      </section>

      <section className={`${showChat ? "flex" : "hidden"} flex-col z-30 w-[35%] absolute bottom-[12%] right-4 bg-green-600 rounded-2xl`}>
        <div className=" flex justify-end items-center my-2 px-4 cursor-pointer relative" onClick={() => setMinimize(!minimize)}>
          <div className=" absolute left-5 text-white">Chat</div>
          <div className=" mr-3">
          {/* {count > 0 && (
                    <span className=" inline-flex items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-white text-xs">
                      {count}
                    </span>
                  )} */}
          </div>
          
          {
            minimize ? <RiArrowUpSLine color="white" size={20} onClick={() => setMinimize(!minimize)} /> : <RiArrowDownSLine color="white" size={20} onClick={() => setMinimize(!minimize)} />
          }

        </div>
        <div className={`${minimize ? "hidden" : "flex"}`}>
        <UserChat adminId={adminId} />
        </div>
        
      </section>
    </>
  );
}
export default SupportChat;
