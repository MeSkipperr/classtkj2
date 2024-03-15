"use server"
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const secretKey = 'key'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload:any) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg:'HS256'})
        .setIssuedAt()
        .setExpirationTime('7 days from now')
        .sign(key)
}

export async function decrypt(input:string):Promise<any> {
    const{payload} = await jwtVerify(input,key,{
        algorithms : ['HS256'],
    })
    return payload
}

interface LoginSession{
    userName:string
    auth:string
}
export async function login(authLogin:LoginSession) {
    const user = {
        userName:authLogin.userName,
        auth:authLogin.auth
    }

    //create session
    const expires = new Date(Date.now()+ 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt ({user,expires})
    
    cookies().set('user',session, {expires , httpOnly:true})
}   

export async function getSessionLogin() {
    const session = cookies().get('user')?.value;

    if(!session)return null;
    return await decrypt(session)
}

export async function logout() {
    const res = NextResponse.next();
    res.cookies.set('user', '', { expires: new Date(0) });
    return res;
}

export async function updateSassion(req:NextRequest) {
    const res = NextResponse.next();

    const sessionLogin = req.cookies.get('user')?.value;

    if(!sessionLogin){return res}

    const parsed = await decrypt(sessionLogin);
    parsed.expires= new Date (Date.now()+ 7 * 24 * 60 * 60 * 1000)

    res.cookies.set({
        name:'user',
        value: sessionLogin,
        httpOnly:true,
        expires:parsed.expires
    })
    return res
}