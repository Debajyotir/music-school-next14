import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/utils/mailer";

connect();

interface userSchema{
    username: string,
    email: string,
    password: string,
    isVerified ?: boolean,
    isAdmin ?: boolean,
}

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email, password} : userSchema = reqBody;

        //Validation
        
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json(
                {error: "User already exist"},
                {status: 400}
            );

        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password:hashedPassword,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        // send varification email

        await sendEmail({email, emailType:"VERIFY",userId:savedUser._id});

        return NextResponse.json({
            message:"User registered successfully",
            sussess:true,
            savedUser
        });

    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}