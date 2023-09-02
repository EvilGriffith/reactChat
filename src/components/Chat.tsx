import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../main"
import "./css/chat.css"
import {useEffect, useState} from "react"
import { addDoc, collection,serverTimestamp,onSnapshot } from "firebase/firestore"
import { db } from "../main"
import { query } from "firebase/database"



export const Chat = () => {
    const [user]: any = useAuthState(auth)
    const [value,setvalue] = useState("")
    const [count, setcount] = useState(0)
    const [messages,setmessages] = useState<any>([])
    const messageref:any = collection(db, "message")
    useEffect(()=>{
        const queryMessages:any = query(messageref)
        onSnapshot(queryMessages,(snapshot: any) => {
            let messages: any = []
            snapshot.forEach((doc:any) => {
                messages.push({...doc.data(), id: doc.id })
                messages.sort((x: any,y: any) => x.createAt.seconds - y.createAt.seconds)
            })
            console.log(messages)
            setmessages(messages)
        })
        
    },[])

    const sendmessage = async() => {
        if(value !== ""){
            setcount(count + 1)
             await addDoc(messageref,{
                id: count,
                text: value,
                createAt: serverTimestamp(),
                avatar: auth.currentUser?.photoURL,
                name: auth.currentUser?.displayName
             })
             setvalue("")
         }
        
    }

    return (
    <div className="chatapp">
        <div className="chatwindow">{messages.map((value: any) => {
            return user.displayName !== value.name ? (
            <div className="message">
                <div className="avatar" style={{backgroundImage:`url(${value.avatar})`,borderRadius:"25px",marginLeft:"5px"}}/>
                <div className="text"><div className="nick" style={value.name == "CHiKUSHka" ? {color:"#ED726C",marginRight:"auto"} :{marginRight:"auto"}}>{value.name}</div><div className="textmes">{value.text}</div></div>
                
            </div>
                )
                :
                (
            <div className="message" style={{marginLeft:"auto"}}>
                <div className="text" style={{backgroundColor:"#EFFDDE",marginRight:"5px"}}><div className="nick" style={value.name == "CHiKUSHka" ? {color:"#ED726C",marginLeft:"auto"} :{marginLeft:"auto"}}>{value.name}</div><div className="textmes">{value.text}</div></div>
                <div className="avatar" style={{backgroundImage:`url(${value.avatar})`,borderRadius:"25px",marginRight:"5px"}}/>
            </div>
                )
                
            
        })}</div>
        <label className="labelinput">
            <input className="input" placeholder="Сообщение" onChange={(e) => {setvalue(e.target.value)}} value={value} onKeyDown={(event) => {if(event.key == "Enter") sendmessage()}}/>
            <button className="buttin" onClick={sendmessage}></button>
        </label>
    </div>
    )
}