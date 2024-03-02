import { useEffect, useState } from 'react';
import userPic from '../icons/1.png'
import Image from 'next/image';



const Member = () => {
    const [members, setMembers] = useState([
        {
            nama: 'guru',
            work: 'nama guru',
            image: userPic,
        },
        {
            nama: 'Ketua Kelas',
            work: 'nama ketua kelas ',
            image: userPic,
        },
        {
            nama: 'Ketua wakil Kelas',
            work: 'nama wakil ketua kelas ',
            image: userPic,
        },
        {
            nama: '',
            work: 'nama murid',
            image: userPic,
        },
        {
            nama: '',
            work: 'nama murid',
            image: userPic,
        },
        {
            nama: '',
            work: 'nama murid',
            image: userPic,
        },
    ])

    const [numPreviewFirst, setNumPreviewFirst] = useState(0);
    const [numPreviewSecond, setNumPreviewSecond] = useState(3);
    const [projectsToShow, setProjectsToShow] = useState(3);

    const updateProjectsToShow = () => {
        const windowWidth = window.innerWidth;

        if (windowWidth >= 1024) {
            setProjectsToShow(6); // lg: tampilkan 6 proyek
            setNumPreviewSecond(6)
        } else if (windowWidth >= 640) {
            setProjectsToShow(4); // sm: tampilkan 4 proyek
            setNumPreviewSecond(4)
        } else {
            setProjectsToShow(3); // Tampilan default tanpa sm: atau lg: tampilkan 3 proyek
        }
    };

    useEffect(() => {
        updateProjectsToShow();
        window.addEventListener('resize', updateProjectsToShow);

        return () => {
            window.removeEventListener('resize', updateProjectsToShow);
        };
    }, []);

    const nextPre = () => {
        if(numPreviewSecond < members.length){

            setNumPreviewFirst(numPreviewFirst + projectsToShow)
            setNumPreviewSecond(numPreviewSecond + projectsToShow)
        }
    }
    const beforePre = () => {
        if(numPreviewFirst > 0){
            setNumPreviewFirst(numPreviewFirst - projectsToShow)
            setNumPreviewSecond(numPreviewSecond - projectsToShow)
        }
    }

    return (
        <div className=" dark:bg-darkBg w-full pt-40 relative flex flex-col justify-center items-center ">
            <p className='text-third text-lg font-extrabold absolute left-8 top-20 sm:left-[15%] sm:top-32 lg:left-0'>Anggota</p>
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.slice(numPreviewFirst, numPreviewSecond).map((person, index) => (
                    <div key={index} className="rounded  m-auto bg-white w-3/4 p-4  relative shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                        <div className="aspect-square flex justify-center">
                            <Image
                                src={person.image}
                                alt=''
                                className='w-96 rounded m-auto sm:w-96'
                            />
                        </div>
                        <div className="w-auto ">
                            <p className="text-2xl font-bold">{person.work}</p>
                            <span className="text-xl truncate">{person.nama}</span>
                        </div>
                    </div>
                ))}
            </div>
                <div className="flex gap-4 justify-around my-4">
                    <p onClick={beforePre} className={`dark:text-white  text-lg dark:hover:text-third hover:text-third cursor-pointer`}>Sebelumnya</p>
                    <p onClick={nextPre} className={`dark:text-white  text-lg dark:hover:text-third hover:text-third cursor-pointer`}>Selanjutnya</p>
                </div>
        </div>
    )
}
export default Member;