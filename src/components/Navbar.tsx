import { login_route } from "./const/constaints"
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
                <div className="ava" style={user ? {backgroundImage: `url(${user.photoURL})`} : {}}/>
                <div className="nickname" style={user?.displayName == "CHiKUSHka" ? {color: "#2EFF49"} : {color: "white"}}>{user?.displayName}</div>
                {user ? <button className="but" onClick={() => {signOut(auth)}}><Link to={login_route} className="link">Выйти</Link></button> : <button className="but"><Link className="link" to={login_route}>Войти</Link></button>}
            </div>
        </div>
    )
}