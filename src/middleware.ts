import { NextApiResponse } from 'next';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';




export const middleware =  (req:NextRequest,res:NextApiResponse)=>{
    const { method } = req;

    if (method === 'GET') {
        const { session } = req.cookies;
    
        if (!session) {
          return res.redirect('/login');
        }
    
        // Do additional checks with your server on the session
        // For example:
        // const isValidSession = checkSession(session);
        // if (!isValidSession) {
        //   return res.redirect('/login');
        // }
    
        return res.redirect('/dashboard');
      }
    
      return res.status(405).end(); // Method Not Allowed
}




    // const isLogin = true;

    // if(!isLogin){
    //     return NextResponse.redirect(new URL('/noUser', req.url));
    // }
    // return NextResponse.next();



// export const config = {
//     matcher:['/notif','/user/'],
// }

