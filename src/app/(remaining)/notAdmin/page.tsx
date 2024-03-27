import { MdAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

const NotAdmin = () => {
    return ( 
        <div className="w-full h-dvh dark:bg-darkBg flex justify-center items-center flex-col px-4 gap-2">
            <MdAdminPanelSettings className=" dark:fill-white w-52 h-20 sm:h-28" />
            <p className="dark:text-white sm:text-2xl">Akses terbatas hanya untuk pihak yang berwenang.</p>
            <Link href="/" className=" underline text-second sm:text-2xl">
                Kembali
            </Link>
        </div>
    );
}

export default NotAdmin;