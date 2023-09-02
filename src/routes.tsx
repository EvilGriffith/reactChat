import { Chat } from "./components/Chat";
import { Login } from "./components/Login";
import { chat_route, login_route } from "./components/const/constaints";

export const publicRoutes = [
    {
        path: login_route,
        el: Login
    }
]
export const privateRoutes = [
    {
        path: chat_route,
        el: Chat
    }
]