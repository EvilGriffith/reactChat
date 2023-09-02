import { Route,Routes} from "react-router-dom"
import { privateRoutes, publicRoutes } from "../routes"
import {useAuthState} from "react-firebase-hooks/auth"
import { auth } from "../main"



export const AppRoute = () => {
 const [user] = useAuthState(auth)
 
 
 return user ?
    (
        <Routes>
            {privateRoutes.map(({path,el}) => 
            <Route key={path} path={path} Component={el}/>
             )}
             <Route path="*"/>
        </Routes>
    )
    :
    (
        <Routes>
            {publicRoutes.map(({path,el}) => 
            <Route key={path} path={path} Component={el}/>
             )}
            <Route path="*"/>
        </Routes>
    ) 
}