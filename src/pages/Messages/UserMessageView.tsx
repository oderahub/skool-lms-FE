import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, selectFilteredMessages } from "../../states/messages/messagesSlice";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";

const UserMessageView: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const filteredMessages = useSelector(selectFilteredMessages);

  const searchRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchValue(""); 
        dispatch(setSearchQuery("")); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    dispatch(setSearchQuery(value));
  };

  const handleViewClick = (searchValue: string) => {
    if (filteredMessages.length === 0 || searchValue.trim() === "") return;
    // navigate(`/chat?search=${encodeURIComponent(searchValue)}`);
      navigate ('/chat')
  };

  // Test message data
  const testMessage = {
    imageUrl: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
    name: "Olalekan",
    message: "Kindly check my document again",
    time: "9:40 AM",
    online: true,
  };

  return (
    <div className="bg-white w-6/12 mx-auto mt-10 py-8 px-7 border rounded-2xl transition-all duration-300">
      <div>
        <h2 className="font-serif text-4xl text-black-100">Messages</h2>
        <div className="relative mt-3 mb-7">
          <input
            ref={searchRef}
            type="text"
            id="Search"
            placeholder="Search"
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full rounded-2xl border-gray-200 py-2.5 pr-10 shadow-sm sm:text-md px-5 bg-zinc-200"
          />
        </div>
      </div>
      <div>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message, index) => (
            <div key={index} onClick={() => handleViewClick(message.message)} style={{ cursor: "pointer" }}>
              <Message
                imageUrl={message.imageUrl}
                name={message.name}
                message={message.message}
                time={message.time}
                online={true}
              />
            </div>
          ))
        ) : (
          searchValue.trim() ? (
            // <p className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md">Not found</p>
            <p className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md">{searchValue.trim() ? "Not found" : "No messages" }</p>

          ) : 
          (
            <div onClick={() => handleViewClick(testMessage.message)} style={{ cursor: "pointer" }}>
              <div className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md" style={{ maxWidth: "700px" }}>
                <Message
                  imageUrl={testMessage.imageUrl}
                  name={testMessage.name}
                  message={testMessage.message}
                  time={testMessage.time}
                  online={true}
                />
              </div>
            </div>
          )
        )
        }
      </div>
    </div>
  );
};

export default UserMessageView;




