'use server'

import { signIn } from "@/auth"
import { getUserByEmail, getUserById } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/token"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"
import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validateFields = LoginSchema.safeParse(values)

    if (!validateFields.success) {
        return {error: "Invalid fields"}
    }
    const { email, password } = validateFields.data
    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Email does not exits!"}
    }
    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: "Confirmation email sent!"}
    }

    

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
              case "CredentialsSignin":
                return { error: "Invalid credentials!" }
              default:
                return { error: "Something went wrong!" }
            }
        }
        throw error
    }
}