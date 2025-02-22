"use server";

import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import { currentUser } from "@/lib/session";

export default async function fetchAllUsers() {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    await connectDB();

    const data = await User.aggregate([
        {
            $project: {
                name: 1,
                image: 1,
                coursesCount: { $size: "$coursesStatus" }, // Compute array length
            },
        },
        {
            $sort: { coursesCount: -1 }, // Sort by course count (descending)
        },
    ]);

    return data.map((u) => [u.name, u.image, u.coursesCount, u.name === user.name]); 
}
