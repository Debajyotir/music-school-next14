import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/utils/mailer";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request:NextRequest){
    try {

        const reqBody = await request.json();
        const {email} = reqBody;

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json(
                {error: "User not found please signup"},
                {status: 500}
            );
        }

        await sendEmail({email, emailType:"RESET",userId:user._id});

        return NextResponse.json({
            message:"Otp send successfully",
            sussess:true,
        });
        
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}