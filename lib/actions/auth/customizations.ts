"use server";

import { z } from "zod";
import { currentUser } from "@/lib/session";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import { CustomizationsValidation } from "@/lib/validations/auth";

type CustomizationsInput = z.infer<typeof CustomizationsValidation> & {
    [key: string]: any;
};    

export const customizations = async (values: CustomizationsInput) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    await connectDB();
    const existingUser = await User.findById(user._id);

    if (!existingUser) {
        return { error: "Unauthorized" };
    }

    for (const key in values) {
        if (values[key] === "") {
            values[key] = undefined;
        }
    }

    await User.findByIdAndUpdate(user._id, { ...values });
    return { success: "Customizations Updated!" };
};
