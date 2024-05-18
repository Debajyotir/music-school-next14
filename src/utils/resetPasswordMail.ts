import User from "@/models/userModel";
import { v4 as uuidv4 } from 'uuid';

const resetPasswordMail = async(email:string) => {
    try {

        const hashedToken = uuidv4().substring(0,6);

        await User.findOneAndUpdate({email},{
           $set: {forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000}}
        )

        return hashedToken;

    } catch (error:any) {
        throw new Error(error.message);
    }
}

export default resetPasswordMail;