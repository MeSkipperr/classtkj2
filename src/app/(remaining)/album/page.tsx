"use client"
import Image from 'next/image';
import { FaPlay } from "react-icons/fa";
import { useRouter ,useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { GoPlus } from "react-icons/go";
import axios from 'axios';

interface PostData {
    _id: string;
    mediaID: number;
    fileName: string;
    tanggal: string;
    userPost: string;
    caption: string;
    like: number;
    commet: {
        userName: string;
        userComment: string;
    }[];
    hash:string;
}

const Album = () => {  
    const serverUrl = process.env.NEXT_PUBLIC_API_SERVER_URL;

    // const mediaParms = searchParams.get('media')
    const [showMedia, setShowMedia] = useState(false);
    const [showMediaUrl, setShowMediaUrl] = useState('');

    const [postData, setPostData] = useState<PostData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const res = await axios.get(serverUrl+`api/album/media`); 
            setPostData(res.data)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
        fetchData();
    }, [serverUrl]);

    const searchParams = useSearchParams();
    useEffect(() => {
        const mediaParms = searchParams.get('media');
    
        if(mediaParms){
            setShowMedia(true);
            setShowMediaUrl(mediaParms)
        }
    }, [searchParams]);
    

    return ( 
        <div className="w-full h-dvh dark:bg-darkBg flex items-start flex-col px-4 gap-2 mt-28 mb-20 relative">
            {showMedia &&
                <div className="absolute inset-0 bg-white z-30">
                    <p>{showMediaUrl}</p>
                </div>
            }
            <p className="text-third text-lg">Album</p>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-2 place-items-center w-full">
                {postData.map((post, index) => {
                    const videoExtensions = ['mp4', 'mov', 'avi'];

                    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

                    if (post.fileName && post.fileName !== "") {
                        const fileExtension = post.fileName.split('.').pop()?.toLowerCase();
                        if (fileExtension) {
                            if (videoExtensions.includes(fileExtension)) {
                                return <VideoPost key={index} fileName={post.fileName} hash={post.hash}/>;
                            } else if (imageExtensions.includes(fileExtension)) {
                                return <PhotoPost key={index} fileName={post.fileName} hash={post.hash} />;
                            }
                        }
                    }
                    return <TweetPost key={index}  hash={post.hash} caption={post.caption} />;
                })}
            </div>
            <div className="cursor-pointer fixed  size-12 sm:size-16 border-third border-2 sm:border-4  bottom-20 right-5 lg:right-8 lg:bottom-12 rounded-full flex justify-center items-center"><GoPlus className='size-8 sm:size-10 text-third' /></div>
        </div>
    );
}

interface MediaInter {
    fileName?:string
    hash:string
    caption?:string
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
    return(
        <div className="cursor-pointer size-28 sm:size-52 "  onClick={changeShow}>
            <Image src={`${serverUrl}api/videos/${fileName}`} className='size-full object-cover rounded-sm'   alt=''/>
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

const TweetPost =({hash,caption}:MediaInter)=>{
    const router = useRouter();

    const hashIdTweet = hash;
    const changeShow  = () =>{
        const params = new URLSearchParams();
        params.append('media', hashIdTweet);

        const queryString = params.toString();
        router.push(`/album?${queryString}`);
    }

    return ( 
        <div className="cursor-pointer size-28 sm:size-52 relative z-10  overflow-hidden flex justify-center items-start " onClick={changeShow}>
            <p className='dark:text-white text-sm sm:text-lg overflow-hidden'>{caption}</p>
        </div>
    );
}


export default Album;