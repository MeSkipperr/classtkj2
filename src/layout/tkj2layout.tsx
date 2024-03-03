import Navbar from '@/components/navbar';
import SideBarCom from '@/components/sidebar';

const Tkj2Layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return(
        <>
        <Navbar/>
        <div className="flex w-full">
            <SideBarCom/>
            <div className=" flex-grow h-dvh overflow-y-auto dark:bg-darkBg">
                {children}
            </div>
        </div> 
        </>
    )
}


export default Tkj2Layout