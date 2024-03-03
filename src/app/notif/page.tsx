// "use client"
import CheckLogin from "@/function/checkLogin"
import NoUser from "@/components/noUser";
import Tkj2Layout from "@/layout/tkj2layout";

const Notifikasi = ()=>{
    const {login} = CheckLogin();

    return(
        <Tkj2Layout>
            {login?
            <div className="w-full h-dvh dark:bg-darkBg mt-28 px-4">
            <p className='text-third text-lg font-extrabold absolute left-8 top-20 sm:left-[15%] sm:top-32 lg:left-0'>Notifikasi</p>
                <ul className="flex flex-col gap-2">
                    <li className="w-full border-b p-1 flex justify-between">
                        <div className="">
                            <p className=" text-sm  text-second">Kamis 20-20-2020</p>
                            <p className=" text-sm  font-semibold dark:text-white ">JUDUL</p>
                            <span className=" text-sm dark:text-white">Deskripsi </span>
                            <p className=" text-sm  dark:text-white ">Dikumpul tanggal jumat 30-30-3030</p>
                        </div>
                        <div className="">
                            <input type="checkbox" name="" id="" className="w-8 h-8 cursor-pointer bg-dark"/>
                        </div>
                    </li>
                </ul>
            </div>
            :
            <NoUser/>}
        </Tkj2Layout>
        
    )
}

export default Notifikasi