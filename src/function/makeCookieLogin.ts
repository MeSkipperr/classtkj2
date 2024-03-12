"use server"
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'


interface CoockieData{
    correct : boolean,
    userName:string,
    password:string,
    uniqCode:string,
}

const MakeCoockieLogin = (data:CoockieData)=> {
    cookies().set('user', data.userName, { maxAge: 604800  })
    cookies().set('auth', data.uniqCode, { maxAge: 604800  })
}

export default MakeCoockieLogin