"use client"
import { useEffect, useState, FormEvent } from 'react';
import axios from "axios";
import {toast} from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import Link from 'next/link';
import { BackgroundBeams } from "@/components/ui/background-beams";

const Page = ({}) => {

    const router = useRouter();

    const [user,setUser] = useState({
        email:"",
        password:"",
        username:"",
    });

    const [buttonDisabled,setButtonDisabled] = useState(false);

    const [loading,setLoading] = useState(false);

    const onSignUp = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            setButtonDisabled(true);
            const response = await axios.post("/api/users/signup",user);
            router.push("/login");
        } catch (error:any) {
            console.log("Sign Up failed");
            toast.error(error?.response?.data?.error);
            setUser({
                email:"",
                password:"",
                username:"",
            });
            setButtonDisabled(false);
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user])

    return( 
        <div className="min-h-screen bg-black py-12 pt-32 text-white flex flex-col justify-center items-center">
            <BackgroundBeams />
            <div className="max-w-64 sm:max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 shadow-input 
                bg-white dark:bg-black border-2 z-20 dark:bg-opacity-0">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    {loading ? "Processing" : "SignUp"}
                </h2>

                <form className="my-8" onSubmit={(e)=>onSignUp(e)}>
                        
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" 
                        placeholder="Tyler" 
                        value={user.username}
                        onChange={(e)=>setUser({...user, username: e.target.value})} 
                        type="text" />
                    </LabelInputContainer>

                
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" 
                        placeholder="Tyler@durden.com" 
                        value={user.email}
                        onChange={(e)=>setUser({...user, email: e.target.value})} 
                        type="email" />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" 
                        placeholder="********" 
                        value={user.password}
                        onChange={(e)=>setUser({...user, password: e.target.value})} 
                        type="password" />
                    </LabelInputContainer>


                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 
                        dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white 
                        rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] 
                        dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] mt-6 
                        disabled:hover:cursor-not-allowed"
                        type="submit"
                        disabled = {buttonDisabled}
                    >
                        Sign up &rarr;
                        
                        <BottomGradient />
                    </button>
                        
                </form>
            </div>
            <p className="mt-2 z-20">
                Already have an account?
                    <span className="text-blue-900">
                        <Link href={"/login"}> Login here</Link>
                    </span>
            </p>
        </div>
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

const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
};

export default Page;