"use client"
import Image from 'next/image';
import { FaPlay } from "react-icons/fa";
import { useRouter ,useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { GoPlus } from "react-icons/go";
import axios from 'axios';
import MediaPlayer from './singleMedia';

interface PostData {
    _id: string;
    mediaID: number;
    fileName: string;
    tanggal: string;
    userPost: string;
    caption: string;
    like: number;
    comment: {
        userName: string;
        userComment: string;
    }[];
    hash:string;
}

const Album = () => {
        const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

    // const mediaParms = searchParams.get('media')
    const [showMedia, setShowMedia] = useState(false);
    const [showMediaPlayer, setShowMediaPlayer] = useState({});
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const [postData, setPostData] = useState<PostData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const res = await axios.get(serverUrl+`api/album/media`); 
            setPostData(res.data)
            setIsLoading(false)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchData();
    }, [serverUrl]);

    const findPostByHash = (postData: PostData[], hashToFind: string): PostData | undefined => {
        return postData.find(post => post.hash === hashToFind);
    };

    const searchParams = useSearchParams();
    useEffect(() => {
        const mediaParms = searchParams.get('media');
        if(mediaParms&&postData.length !== 0){
            const foundHash = findPostByHash(postData, mediaParms);
            if(foundHash){
                setShowMedia(true);
                setShowMediaPlayer(foundHash);
                console.log(foundHash)
            }else{
                router.push(`/album`);
            }
        }
    }, [searchParams,postData,router]);
    return ( 
    <>
    {showMedia ?
        <MediaPlayer data={showMediaPlayer} setShowMedia={setShowMedia}/>
    :
    <div className="w-full h-dvh dark:bg-darkBg flex items-start flex-col px-4 gap-2 mt-28 mb-20 lg:mb-0 relative">
    <p className="text-third text-lg">Album</p>
    {isLoading ? (
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-y-8 place-items-center w-full">
            {[...Array(10)].map((_, index) => (
                <AlbumSkelton key={index} />
            ))}
        </div>
    ) : (
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 place-items-center w-full">
            {postData.map((post, index) => {
                const videoExtensions = ['mp4', 'mov', 'avi'];
                const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                
                if (post.fileName && post.fileName !== "") {
                    const fileExtension = post.fileName.split('.').pop()?.toLowerCase();
                    if (fileExtension) {
                        if (videoExtensions.includes(fileExtension)) {
                            return <VideoPost key={index} fileName={post.fileName} hash={post.hash} />;
                        } else if (imageExtensions.includes(fileExtension)) {
                            return <PhotoPost key={index} fileName={post.fileName} hash={post.hash} />;
                        }
                    }
                }
                return null; // Handle cases where no component is returned
            })}
        </div>
    )}
    <div className="cursor-pointer fixed size-12 sm:size-16 border-third border-2 sm:border-4 bottom-20 right-5 lg:right-8 lg:bottom-12 rounded-full flex justify-center items-center">
        <GoPlus className='size-8 sm:size-10 text-third' />
    </div>
</div>
    }
    </>
    );
}

export default Album;

interface MediaInter {
    fileName:string
    hash:string
}

const PhotoPost = ({fileName,hash}:MediaInter)=>{
    const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

    const router = useRouter();

    const hashIdPhoto = hash

    const changeShow  = () =>{
        const params = new URLSearchParams();
        params.append('media', hashIdPhoto);

        const queryString = params.toString();
        router.push(`/album?${queryString}`);

    }
    const src = `${serverUrl}api/media/${fileName}`;
    return(
        <div className="cursor-pointer size-28 sm:size-52 "  onClick={changeShow}>
            <Image
                loader={() => src} src={src}
                className="size-full object-cover rounded-sm"
                alt={fileName}
                width={300} // Set your desired width
                height={200} // Set your desired height
                unoptimized 
                priority
            />
        </div>
    )
}

const VideoPost = ({fileName,hash}:MediaInter) => {
    const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

    const router = useRouter();

    const hashIdVideo = hash;

    const changeShow  = () =>{
        const params = new URLSearchParams();
        params.append('media', hashIdVideo);

        const queryString = params.toString();
        router.push(`/album?${queryString}`);
    }

    return(
        <div className="cursor-pointer size-28 sm:size-52 relative z-10" onClick={changeShow}>
            <div className="absolute inset-0 bg-[#20202650]  flex justify-center items-center "><FaPlay className='size-8 text-white'/></div>
            <video className="size-full object-cover rounded-sm" >
                <source src={`${serverUrl}api/videos/${fileName}`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

const AlbumSkelton = () =>{
    return (
        <div className="cursor-pointer size-28 sm:size-52 bg-gray-600 loading-skeleton opacity-5"  >

        </div>
        )
}