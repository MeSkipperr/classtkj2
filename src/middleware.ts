import { NextRequest, NextResponse } from "next/server";
import { updateSassion , getSessionLogin,logout} from "./lib";

export async function middleware(req:NextRequest) {
    const stillLogin = await getSessionLogin()
    
    if(!stillLogin){
        return NextResponse.redirect(new URL("/nouser", req.url))
    }

    return await updateSassion(req);
}

export const config ={
    matcher:['/notif']
}



// if(req.nextUrl.pathname === '/login'){
//     return await logout();
// }
