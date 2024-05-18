"use client"
import { useEffect, useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/router';
import { Boxes } from "@/components/ui/background-boxes";
import Link from 'next/link';
import { Meteors } from "@/components/ui/meteors";


const Page = ({}) => {
    // const router = useRouter();
    const [token,setToken] = useState("");
    const [verified,setVerified] = useState(false);
    const [error,setError] = useState(false);

    const verifyUserEmail = async() =>{
        try {
            const verify = await axios.post("/api/users/verifyemail",{token});
            setVerified(true);
            setError(false);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(()=>{
        setError(false);
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");

        // const {query} = router;
        // const urlToken2 = query.token;
    },[]);

    useEffect(()=>{
        setError(false);
        if(token.length>0){
            verifyUserEmail();
        }
    },[token]);

    return( 
        <div className="min-h-screen overflow-hidden relative bg-black py-12 pt-32
         text-white flex flex-col items-center">
            <Boxes />
            <h1 className='text-5xl z-20 mb-20 mt-20'>Verify Email</h1>
    
            {verified && (
                <div className='z-20'>
                    <h2 className='text-4xl text-lime-500 mb-10 p-1'>Verified</h2>
                    <p className="mt-2 z-20">
                        Visit Login page
                            <span className="text-blue-500">
                                <Link href={"/login"}> here</Link>
                            </span>
                    </p>
                    <Meteors number={20} />
                </div>
            )} 

            {error && (
                <div className='z-20'>
                    <h2 className='text-4xl text-red-700'>Error</h2>
                </div>
            )}
        </div>
    );
}

export default Page;