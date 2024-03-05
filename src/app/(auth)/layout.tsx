import Navbar from '@/components/navbar';
import SideBarCom from '@/components/sidebar';

const AuthLayout = ({     
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return(
    <>
    <div className="w-full h-10 bg-blue-400">
        navbar
    </div>
    {children}
    </>
  )
}

export default  AuthLayout;
