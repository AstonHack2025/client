"use server";

import courseCategories from "@/constants/courses";
import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import { currentUser } from "@/lib/session";

export default async function fetchCategoryCompletion() {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" };
    }
    await connectDB();

    const keywords = Object.keys(courseCategories);

    // Finds the amount of courses the user has done of each category
    const data = await User.aggregate([
        {
            $unwind: "$courseStatus",
        },
        {
            $match: { items: { $regex: `^(${keywords.join("|")})`, $options: "i" } },
        },
        {
            $group: {
                _id: { $substrCP: ["$items", 0, { $indexOfCP: ["$items", " "] }] },
                count: { $sum: 1 },
            },
        },
    ]);

    // divide and map to be done next
    const courseCompletion = data.map((entry) => {
        return {
            category: entry._id,
            completion: entry.count / courseCategories[entry._id].length,
        };
    });
    // Determines colour of badge based on completion
    const badgeData = courseCompletion.map((entry) => {
        if (entry.completion == 1) {
            return {
                category: entry.category,
                color: "#fff94d",
            };
        } else if (entry.completion >= 0.5) {
            return {
                category: entry.category,
                color: "#9e9e9e",
            };
        } else if (entry.completion >= 0.25) {
            return {
                category: entry.category,
                color: "#bd6e52",
            };
        } else {
            return {
                category: entry.category,
                color: "#ffffff",
            };
        }
    });

    return badgeData;
}
