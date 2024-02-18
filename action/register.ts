'use server'

import { getUserByEmail } from "@/data/user"
import { db } from "@/lib/db"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcryptjs"
import * as z from "zod"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values)

    if (!validateFields.success) {
        return {error: "Invalid fields"}
    }

    const { email, password, name } = validateFields.data
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {error: "User already exists"}
    }

    await db.user.create({
        data: {
            email: email,
            name: name,
            password: hashedPassword,
        }
    })

    return {success: "User Created!"}
}