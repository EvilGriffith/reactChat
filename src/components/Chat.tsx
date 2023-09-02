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
            setmessages(messages)
        })
        
    },[])

    const sendmessage = async() => {
        if(value !== ""){
            const date = new Date()
            const hours = date.getHours()
            const minutes = date.getMinutes()
            let copyhours = String(hours)
            let copyminutes = String(minutes)
            if(copyhours.length == 1){
                copyhours = "0" + copyhours
            }
            if(copyminutes.length == 1){
                copyminutes = "0" + copyminutes
            }
            const createmes = copyhours + ":" + copyminutes
            setcount(count + 1)
             await addDoc(messageref,{
                id: count,
                text: value,
                createAt: serverTimestamp(),
                avatar: auth.currentUser?.photoURL,
                name: auth.currentUser?.displayName,
                date: createmes
             })
             setvalue("")
             
         }
         
    }
    const autoscroll:any = () =>{
        setTimeout(() => {
            document.querySelector<any>(".chatwindow").scrollTop = 9999
        }, 500)
    }
    setTimeout(() => {
        document.querySelector<any>(".chatwindow").scrollTop = 9999
    }, 1000)
    return (
    <div className="chatapp">
        <div className="chatwindow" onChange={autoscroll()}>{messages.map((value: any) => {
         
            return user.displayName !== value.name ? (
            <div key={value.id} className="message">
                <div className="avatar" style={{backgroundImage:`url(${value.avatar})`,borderRadius:"25px",marginLeft:"5px"}}/>
                <div className="text"><div className="nick" style={value.name == "CHiKUSHka" ? {color:"#ED726C"} :{}}>{value.name}</div><div className="textmes">{value.text}</div><div className="time">{value.date}</div></div>
                
            </div>
                )
                :
                (
            <div className="message" style={{marginLeft:"auto"}}>
                <div className="text" style={{backgroundColor:"#EFFDDE",marginRight:"5px"}}><div className="nick" style={value.name == "CHiKUSHka" ? {color:"#ED726C"} :{}}>{value.name}</div><div className="textmes">{value.text}<div className="time">{value.date}</div></div></div>
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