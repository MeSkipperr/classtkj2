import { FaUserAltSlash } from "react-icons/fa";
import Link from "next/link";

const NoUser  = ()=>{
    return(
        <div className="w-full h-dvh dark:bg-darkBg flex justify-center items-center flex-col px-4 gap-2">
            <FaUserAltSlash className=" dark:fill-white w-52 h-20 sm:h-28" />
            <p className="dark:text-white sm:text-2xl">Masuk dengan user TKJ 2 untuk akses.</p>
            <Link href="/login" className=" underline text-second sm:text-2xl">
                Masuk
            </Link>
        </div>
    )
}

export default NoUser