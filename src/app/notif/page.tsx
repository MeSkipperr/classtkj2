// "use client"
import CheckLogin from "@/function/checkLogin"
import NoUser from "@/components/noUser";
import Tkj2Layout from "@/layout/tkj2layout";
import CheckBox from "@/components/checkBox";

const Notifikasi = ()=>{
    const {login} = CheckLogin();

    return(
        <Tkj2Layout>
            {login?
            <div className="w-full h-dvh dark:bg-darkBg mt-28 px-4 ">
                <p className="text-third text-lg pb-6">Notifikasi</p>
                <ul className="gap-4 flex flex-col">
                    <li className="flex border-b pb-2">
                        <div className="pr-4 pt-2">
                            <CheckBox check={false}/>
                        </div>
                        <div className="w-full dark:text-white">
                            <div className="flex w-full justify-between sm:text-xl">
                                <p className="dark:text-white font-semibold">Membuat Website</p>
                                <span className=" text-gray-500">20-20-2020</span>
                            </div>
                            <p className="text-sm sm:text-lg">Tugas membuat website dengan react js untuk perjualan kopi</p>
                            <p className="mt-2 text-sm sm:text-lg">Dikumpul pada kamis, 21-10-1010</p>
                        </div>
                    </li>
                    <li className="flex border-b pb-2 opacity-20 ">
                        <div className="pr-4 pt-2">
                            <CheckBox check={true}/>
                        </div>
                        <div className="w-full dark:text-white line-through">
                            <div className="flex w-full justify-between sm:text-xl">
                                <p className="dark:text-white font-semibold">Membuat Website</p>
                                <span className=" text-gray-500">20-20-2020</span>
                            </div>
                            <p className="text-sm sm:text-lg">Tugas membuat website dengan react js untuk perjualan kopi</p>
                            <p className="mt-2 text-sm sm:text-lg">Dikumpul pada kamis, 21-10-1010</p>
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