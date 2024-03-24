import { NextRequest, NextResponse } from "next/server";
import { updateSassion , getSessionLogin,logout} from "./lib";


export async function middleware(req:NextRequest) {
    const stillLogin = await getSessionLogin();

    if(!stillLogin){
        return NextResponse.redirect(new URL("/nouser", req.url))
    }
    
    const authName = await getSessionLogin();
    
    const usersNotifForm = ['admin','yola']
    
    if(!usersNotifForm.includes(authName.user.userName)){
        return NextResponse.redirect(new URL("/notAdmin", req.url))
    }

    return await updateSassion(req);
}

export const config ={
    matcher:['/notif','/notifForm']
}



// if(req.nextUrl.pathname === '/login'){
//     return await logout();
// }
