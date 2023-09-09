import "./css/login.css"
import { auth, provider } from "../main";
import {signInWithPopup} from "firebase/auth"

import {chat_list} from "./const/constaints";
import {Link} from "react-router-dom"



export const Login = () => {
    const log = async () =>{
        const user = await signInWithPopup(auth, provider)
        console.log(user)
        
    }

    return (
        <div className="container">
            <Link to={chat_list}><button className="butt" onClick={log}>Войти с помощью Google</button></Link>
        </div>
    )
}