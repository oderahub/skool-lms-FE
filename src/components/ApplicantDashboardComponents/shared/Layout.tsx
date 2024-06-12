
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect } from 'react';
import socket from '../../../../socket'

// interface OnlineUser {
//     userId: string;
//     socketId: string;
//   }


export default function Layout() {

    const userId = useSelector((state: RootState) => state.userDetails.userId);
    // const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);

    useEffect(() => {      
        if (userId) {
            socket.emit("addNewUser", userId);
        }
    }, [userId]);

    // useEffect(() => {
    //     socket.on("onlineUsers", (users:OnlineUser[]) => {
    //       setOnlineUsers(users);
    //     });
    
    //     return () => {
    //       socket.off("onlineUsers");
    //     };
    //   }, [socket]);

    return (
        <div className="bg-neutral-100 h-screen w-screen overflow-hidden  flex flex-row">
            <Sidebar />
            <div className="flex flex-col flex-1">
                <Header />
              
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
