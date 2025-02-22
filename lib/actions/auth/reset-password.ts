"use server";

import { z } from "zod";

import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import { UserProvider } from "@/lib/models/types";
import { ResetPasswordValidation } from "@/lib/validations/auth";
import { generateToken } from "@/lib/jwt-token";
import { sendPasswordResetEmail } from "@/lib/mailer";

type ResetPasswordInput = z.infer<typeof ResetPasswordValidation>;

export const resetPassword = async (values: ResetPasswordInput) => {
    const validatedFields = ResetPasswordValidation.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid email!" };
    }

    let { email } = validatedFields.data;
    email = email.toLowerCase();
    
    await connectDB();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return { error: "Email not found!" };
    }

    if (existingUser.provider !== UserProvider.CREDENTIALS) {
        return { error: "Email has already been used for third-party login" };
    }

    const passwordResetToken = await generateToken({ email });
    await sendPasswordResetEmail(email, passwordResetToken);

    return { success: "Reset email sent!" };
};
