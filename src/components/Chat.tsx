import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../main"
import "./css/chat.css"
import {useEffect, useState} from "react"
import { query,collection,onSnapshot, updateDoc,doc } from "firebase/firestore"
import { db } from "../main"

import { thischat } from "./Chatlist"






export const Chat = () => {
    const [user] = useAuthState(auth)
    const [chat,setchat] = useState<any>([])
    const [ref,setref] = useState<any>()
    const [value,setvalue] = useState("")
    const [banlist, setbanlist] = useState<any>()
    let banned = false
    const mesref = collection(db,"allchats")
    useEffect(()=>{
        const queryMessages:any = query(mesref)
        onSnapshot(queryMessages,(snapshot: any) => {
            let messages: any = []
            snapshot.forEach((doc:any) => {
                messages.push({...doc.data(), id: doc.id })
                for(let i = 0;i < messages.length;i++){
                    if(messages[i].count == thischat.count && messages[i].name == thischat.name){
                        setchat(messages[i].messages)
                        setbanlist(messages[i].banlist)
                        setref(messages[i].id)
                    }
                }
            })
            
        })
        
    },[])
    const autoscroll:any = () =>{
        setTimeout(() => {
            document.querySelector<any>(".chatwindow").scrollTop = 9999
        }, 500)
    }
    setTimeout(() => {
        document.querySelector<any>(".chatwindow").scrollTop = 9999
    },1000)

    const docid = String(ref)
    const docRef = doc(db,"allchats",docid)
    const sendMessage = async() => {
        if(value != ""){
        const date = new Date
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
        const adddate = copyhours + ":" + copyminutes 
        let obj = Object.assign([])
        obj.push(...chat)
        obj.push({
            avatar: user?.photoURL,
            name: user?.displayName,
            text: value,
            date: adddate
        })
        await updateDoc(docRef,{
            messages: obj,
        })
        setvalue("")
    }
    }
    

const checkbanned = () => {
    if(banlist){
        for(let i = 0;i < banlist.length;i++){
            if(banlist[i] == user?.displayName){
                banned = true
            }
            else{
                banned = false
            }
        }
        }
}
checkbanned()      

 
    return (
    <div className="chatapp">
        <div className="chatname">{thischat.name}</div>
        <div className="chatwindow" onChange={()=>{autoscroll()}}>
            
           {!banned ? chat.map((value:any) => {return user?.displayName !== value.name ? (
            <div key={value.id} className="message">
                <div className="avatar" style={{backgroundImage:`url(${value.avatar})`,borderRadius:"25px",marginLeft:"5px"}}/>
                <div className="text"><div className="nick" style={value.name == "CHiKUSHka" ? {color:"#ED726C"} :{}}>{value.name}</div><div className="textmes">{value.text}<div className="time">{value.date}</div></div></div>
                
            </div>
                )
                :
                (
            <div className="message" style={{marginLeft:"auto"}}>
                <div className="text" style={{backgroundColor:"#EFFDDE",marginRight:"5px"}}><div className="nick" style={value.name == "CHiKUSHka" ? {color:"#ED726C"} :{}}>{value.name}</div><div className="textmes">{value.text}<div className="time">{value.date}</div></div></div>
                <div className="avatar" style={{backgroundImage:`url(${value.avatar})`,borderRadius:"25px",marginRight:"5px"}}/>
            </div>
                )
                
                }): <div className="uban">Вы были забанены в этом чате</div>}
                
            
        </div>   
        <label className="labelinput" style={banned ? {visibility:"hidden"} : {visibility:"visible"}}>
            <input className="input" placeholder="Сообщение" value={value} onChange={(e) => {setvalue(e.target.value)}} onKeyDown={(e)=> {if(e.key == "Enter") sendMessage()}}/>
            <button className="buttin" onClick={sendMessage}></button>
        </label>
    </div>
    )
    
}