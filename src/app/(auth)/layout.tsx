import type { Metadata } from "next";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
    title: "TKJ 2 - Login",
    description: "Website SMKN1 Kuta Selatan TKJ 2",
  };
  

const AuthLayout = ({     
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return(
    <>
    {children}
    </>
  )
}

export default  AuthLayout;
