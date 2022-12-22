import { createBrowserRouter } from "react-router-dom";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import LogIn from "../Components/Authentication/LogIn";
import SignIn from "../Components/Authentication/SignIn";
import Opponent from "../Components/Game/Opponent";
import Home from "../Components/Home/Home";
import Main from "../Layout/Main";
import PrivateRouter from "./PrivateRouter";


const api_key = "3pmzbsccz3f3";
const client = StreamChat.getInstance(api_key);
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/signin",
                element: <SignIn></SignIn>
            },
            {
                path: "/login",
                element: <LogIn></LogIn>
            },
            {
                path: "/opponent",
                element: <PrivateRouter><Chat client={client}><Opponent></Opponent></Chat></PrivateRouter>
            },
        ]
    }
])