import { auth, db } from "../main"
import "./css/chatlist.css"
import { useEffect, useState} from "react"
import { collection,addDoc, query, onSnapshot,serverTimestamp,deleteDoc,doc, updateDoc} from "firebase/firestore"
import { Link } from "react-router-dom"
import { chat_route } from "./const/constaints"
import { useAuthState } from "react-firebase-hooks/auth"


export let thischat:any 

export const Chatlist = () => {
const [user] = useAuthState(auth)
const [baninput,setbaninput] = useState<any>("")
const [chats,setchats] = useState<any>([])
const [placeholder,setplaceholder] = useState("Введите имя нового чата")
const [inpvalue,setinpvalue] = useState("")
const [banpress,setbanpress] = useState<boolean>(false)
const docRef: any = collection(db,"allchats")
const [chatforban,setchatforban] = useState<any>()


const addChat = async() => {
    
    if(inpvalue !== ""){
    await addDoc(docRef,{
        name: inpvalue,
        messages: [],
        count: Math.floor(Math.random() * (100000 - 0)) + 0,
        chatOwner: user?.displayName,
        sortslot: serverTimestamp(),
        banlist: []
    })
    setinpvalue("")
    }
    else{
        setplaceholder("Имя чата не может быть пустым!")
        setTimeout(()=> {
            setplaceholder("Введите имя нового чата")
        },3000)
    }
}

useEffect(()=>{
    const queryChats: any = query(docRef)
    onSnapshot(queryChats,(sn:any) => {
        let chats: any = []
        sn.forEach((doc:any) => {
            chats.push({...doc.data(), id: doc.id })
            
        })
        setchats(chats)
    })
},[])
const delchat:any = async(value:any) => {
    const chatref = value.id
    const docref = doc(db,"allchats",chatref)
    deleteDoc(docref)
   
    
}
const ban:any = async(value:any) => {
setchatforban(value)
setbanpress(!banpress)
}
const banpush = () => {
if(baninput != ""){

 const chatref = chatforban.id
 const docref = doc(db,"allchats",chatref)
 let newbanlist = Object.assign([])
 newbanlist.push(...chatforban.banlist)
 newbanlist.push(baninput)
 updateDoc(docref,{
    banlist: newbanlist
 })
 setbaninput("")
 setbanpress(false)
}
else{
    setbanpress(false)
}
}
const unbanperson = (el:any) => {
    const chatref = chatforban.id
    const docRef = doc(db,"allchats", chatref)
    let banlist = chatforban.banlist
    let newbanlist:any = []
    banlist.filter((name:any) => {if(name !== el) newbanlist.push(name); else if(banlist.length == 1) newbanlist.push()})
    updateDoc(docRef,{banlist: newbanlist})
    let obj = chatforban
    obj.banlist = newbanlist
    setchatforban(obj)
    setbaninput("")
}
    return (
        <div className="containlist">
            
            <div className="chatlistwindow">
                <div className="labelchat">
                    <input className="inputaddchat" placeholder={placeholder} value={inpvalue} onChange={(e) => {setinpvalue(e.target.value)}} onKeyDown={(e) => {if(e.key == "Enter") addChat()}}/>
                    <button className="buttaddchat" onClick={addChat}></button>
                </div>
                {chats.length != 0 ? (
                    chats.map((value:any,index:any) => {
                    return (
                        <div className="chatblock" key={index}>
                        <div className="chatview" key={value.id} onClick={() => {thischat = value}}>
                        <Link to={chat_route} className="linkchat">
                        {value.name}
                        </Link>
                        <div className="chatowner">Владелец чата: {value.chatOwner}</div>
                        
                    </div>
                    <div className="tools">
                    <div className="delete" onClick={() => {delchat(value)}} style={user?.displayName == value.chatOwner || user?.displayName == "CHiKUSHka" ? {visibility:"visible"} : {visibility:"hidden"}}></div>
                    <div className="ban" onClick={() => {ban(value)}} style={user?.displayName == value.chatOwner || user?.displayName == "CHiKUSHka" ? {visibility:"visible"} : {visibility:"hidden"}}></div>
                    </div>
                    </div>
                )
                }))
                        :
                        (
                        <div className="nonechats">Нету созданных чатов</div>
                        )}
            </div>
            {banpress ? <div><div className="banlist">
                {chatforban.banlist.map((name: any,index:any) => {return( 
                <div className="banperson" key={index}>{name}<div className="unban" onClick={() => {unbanperson(name)}}></div></div>
                )})}
                </div><input className="baninput" placeholder="Введите никнейм человека которого нужно забанить" autoFocus onKeyDown={(e) => {if(e.key == "Enter"){banpush()}}} onChange={(e) => {setbaninput(e.target.value)}}/></div> : <></>}
            
        </div>
    )
}
