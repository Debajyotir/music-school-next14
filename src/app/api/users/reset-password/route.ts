import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

connect();

export async function POST(request:NextRequest){
    try {

        const reqBody = await request.json();
        const {email,password,otp} = reqBody;

        const user = await User.findOne({email});

        if(user.forgotPasswordToken !== otp){
            return NextResponse.json(
                {error: "Otp not matched"},
                {status: 500}
            );
        }

        if(user.forgotPasswordToken === otp && user.forgotPasswordTokenExpiry<Date.now()){
            return NextResponse.json(
                {error: "Time Expired"},
                {status: 500}
            );
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);
        
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            {
                message: "Reset Password Success",
                sussess:true,
            },
            {status: 200}
        );

        
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}