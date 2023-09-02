import "./css/login.css"
import { auth, provider } from "../main";
import {signInWithPopup} from "firebase/auth"
import {redirect} from "react-router-dom"
import { chat_route } from "./const/constaints";
import {Link} from "react-router-dom"



export const Login = () => {
    const log = async () =>{
        const user = await signInWithPopup(auth, provider)
        console.log(user)
        await redirect(chat_route)
    }

    return (
        <div className="container">
            <Link to={chat_route}><button className="butt" onClick={log}>Войти с помощью Google</button></Link>
        </div>
    )
}