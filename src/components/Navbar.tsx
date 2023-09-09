import { chat_list, login_route } from "./const/constaints"
import "./css/navbar.css"
import {Link} from "react-router-dom"
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from "../main"
import {signOut} from "firebase/auth"

export const Navbar = () => {
    const [user] = useAuthState(auth)
    return (
        <div className="navbar">
            <div className="items">
                <div className="ava" style={user?.photoURL ? {backgroundImage: `url(${user.photoURL})`} : {backgroundImage:"url(https://as2.ftcdn.net/v2/jpg/03/59/58/91/1000_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg)"}}/>
                <div className="nickname" style={user?.displayName == "CHiKUSHka" ? {color: "#2EFF49"} : {color: "white"}}>{user?.displayName}</div>
                {user ? <button className="gotochats"><Link className="link" to={chat_list}>Перейти к чатам</Link></button> : <></>}
                {user ? <button className="but" onClick={() => {signOut(auth)}}><Link to={login_route} className="link">Выйти</Link></button>  : <button className="but"><Link className="link" to={login_route}>Войти</Link></button>}
            </div>
        </div>
    )
}