import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

interface tokenInfo {
    id: string,
    username:string,
    email:string,
}

export async function POST(request : NextRequest){
    try {

        const reqBody = await request.json();
        const {email,password}:{email:string,password:string} = reqBody;

        console.log("rb",reqBody);

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json(
                {error: "User dose not exist"},
                {status: 400}
            );
        }
        console.log("User exist");


        const validPassword = await bcryptjs.compare(password,user.password);

        console.log("Valid Password", validPassword);

        if(!validPassword){
            return NextResponse.json(
                {error: "Password dose not match"},
                {status: 400}
            );
        }


        const tokenData : tokenInfo = {
            id: user._id,
            username:user.username,
            email:user.email,
        }

        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{
            expiresIn: "1d"
        });

        const response = NextResponse.json(
            {message: "Logged In Success"},
            {status: 200}
        );

        response.cookies.set("token",token,{
            httpOnly: true,
        });

        return response;
        
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}