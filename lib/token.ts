import { deleteVerificationTokenById, getVerificationTokenByEmail } from '@/data/verification-token';
import {v4 as uuidV4} from 'uuid'
import { db } from './db';

export const generateVerificationToken = async (email: string) => {
    const token = uuidV4();
    const HOUR = 3600 * 1000 ;
    const expires = new Date(new Date().getTime() + HOUR);  

    const exsitingToken = await getVerificationTokenByEmail(email)
    if (exsitingToken) await deleteVerificationTokenById(exsitingToken.id) ;

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return verificationToken;
    
}