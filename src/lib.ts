"use server"
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_TOKEN;
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
    email:string
}
export async function login(authLogin:LoginSession) {
    const user = {
        userName:authLogin.userName,
        auth:authLogin.auth,
        email:authLogin.email
    }

    //create session
    const expires = new Date(Date.now()+ 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt ({user,expires})
    
    cookies().set('auth',session, {expires , httpOnly:true})
}   

export async function getSessionLogin() {
    const session = cookies().get('auth')?.value;

    if(!session)return null;
    const decryptedSession = await decrypt(session);
    if (!decryptedSession || !decryptedSession.user || !decryptedSession.user.userName || !decryptedSession.user.auth || !decryptedSession.user.email || !decryptedSession.expires || !decryptedSession.iat || !decryptedSession.exp) {
        throw new Error('Invalid session data');
    }
    
    const { user, expires, iat, exp } = decryptedSession;

    return {
        userName: user.userName,
        auth: user.auth,
        email: user.email,
        expires,
        iat,
        exp
    };
}

export async function logout() {
    const res = NextResponse.next();
    res.cookies.set('auth', '', { expires: new Date(0) });
    return res;
}

export async function updateSassion(req:NextRequest) {
    const res = NextResponse.next();

    const sessionLogin = req.cookies.get('auth')?.value;

    if(!sessionLogin){return res}

    const parsed = await decrypt(sessionLogin);
    parsed.expires= new Date (Date.now()+ 7 * 24 * 60 * 60 * 1000)

    res.cookies.set({
        name:'auth',
        value: sessionLogin,
        httpOnly:true,
        expires:parsed.expires
    })
    return res
}