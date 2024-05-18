import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export async function GET(request : NextRequest){
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById({_id:userId}).select({password:0});
        return NextResponse.json({
            message:"User found",
            data:user
        })
    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        );
    }
}