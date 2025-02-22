"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import { UserProvider } from "@/lib/models/types";
import { SignUpValidation } from "@/lib/validations/auth";
import { generateToken } from "@/lib/jwt-token";
import { sendVerificationEmail } from "@/lib/mailer";

const image = "https://www.ibm.com/brand/experience-guides/developer/8f4e3cc2b5d52354a6d43c8edba1e3c9/02_8-bar-reverse.svg"
type SignUpWithCredentialsInput = z.infer<typeof SignUpValidation>;

export const signUpWithCredentials = async (values: SignUpWithCredentialsInput) => {
    const validatedFields = SignUpValidation.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const error = existingUser.provider === UserProvider.CREDENTIALS ? "Email already exists" : "Email has already been used for third-party login";
        return { error };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, image, email, password: hashedPassword });
    await user.save();

    const verificationToken = await generateToken({ email });
    await sendVerificationEmail(email, verificationToken);
    return { success: "Confirmation email sent!" };
};
