import { GoDotFill } from "react-icons/go";

interface MessageProps {
  imageUrl: string;
  name: string;
  message: string;
  time: string;
  online?: boolean; // New prop for online status
}
const Message = (props: MessageProps) => {
  return (
    <article className=" flex items-center px-2  py-2 gap-2 border-b-2 border-green-600/10">
     
       <GoDotFill color={`${props.online ? "green" : "yellow"}`} size={25}  /> 
  
      <div>
        
        <img
          alt=""
          src={props.imageUrl}
          className="h-[3rem] w-[3.5rem] rounded-[50%] object-cover"
        />
      </div>
      <div className="w-full p-0">
        <div className="flex flex-row justify-between items-center w-full">
          <h3 className=" text-base font-semibold text-gray-700 ">{props.name}</h3>
          <p className="font-light text-xs text-gray-500">{props.time}</p>
        </div>
        <p className="font-light text-sm text-slate-500">{props.message}</p>
      </div>
    </article>
  );
};

export default Message;
