"use client"
import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";
import axios from "axios";
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const Page = ({}) => {
    const router = useRouter();
    const [name,setName] = useState("");

    const information = async()=>{
        try {
            const res = await axios.get("/api/users/me");
            setName(res.data.data.username);
        } catch (error:any) {
            console.log(error);
        }
    }


    useEffect(()=>{
        information();
    },[]);

    const handleLogout = async() =>{
        try {
            await axios.get("/api/users/logout");
            toast.success("logout success");
            router.push("/login");
        } catch (error:any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return( 
        <AuroraBackground>
            <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
            >
            <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                Welcome to Music School.
            </div>
            <div className="font-extralight text-2xl md:text-6xl dark:text-neutral-200 py-4">
                {name}
            </div>
            <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
                onClick={()=>router.push("/courses")}
            >
                View Our Courses
            </button>

            <div className="dark:text-neutral-200">
                You can logout from here
            </div>

            <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 
                dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-40 text-white rounded-md 
                h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
                dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                onClick={handleLogout}
            >
                Logout &rarr;
                <BottomGradient />
            </button>
            </motion.div>
        </AuroraBackground>
    );
}

const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };

export default Page;