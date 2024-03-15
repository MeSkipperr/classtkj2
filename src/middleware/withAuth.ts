// import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export default function withAuth(
//     middleware:NextMiddleware,
//     requireAuth:string[]=[],
// ){
//     return async (req:NextRequest,next:NextFetchEvent)=>{
//         const pathname = req.nextUrl.pathname;

//         if(requireAuth.includes(pathname)){
//             const token = await getToken({
//                 req,
//                 secret:'abcd11'
//             });
//             if(!token){
//                 const url = new URL ('/login',req.url);
//                 return NextResponse.redirect(url)
//             }
//         }
//         return middleware (req,next)
//     }
// }