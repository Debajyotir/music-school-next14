import User from "@/models/userModel";
import bcryptjs from "bcryptjs"

const verifyUserMail = async(userId : string) => {
    try {

        const hashedToken = await bcryptjs.hash(userId.toString(),10);

        await User.findByIdAndUpdate(userId,{
            $set : {verifyToken:hashedToken, verifyTokenExpiry: Date.now() + 3600000}}
        )

        return hashedToken;

    } catch (error:any) {
        throw new Error(error.message)
    }
}

export default verifyUserMail;