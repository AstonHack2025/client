"use server";

import connectDB from "@/lib/db";
import { User } from "@/lib/models/auth.model";
import { CourseCompletionStatus, ICourse } from "@/lib/models/types";
import { currentUser } from "@/lib/session";

export default async function updateCoursesStatus(values: String[]) {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" };
    }
    await connectDB();

    const existingUser = await User.findById(user._id);

    if (!existingUser) {
        return { error: "Unauthorized" };
    }

    existingUser.coursesStatus = existingUser.coursesStatus.filter((course: ICourse) => values.includes(course.id));
    values.forEach((courseId) => {
        if (!existingUser.coursesStatus.find((course: ICourse) => course.id === courseId)) {
            existingUser.coursesStatus.push({ id: courseId, status: CourseCompletionStatus.COMPLETED, completedAt: Date.now() / 1000 | 0 }); // Date.now() returns milliseconds, so we divide by 1000 to get seconds and then bit shift to get an integer
        }
    });
    existingUser.markModified("coursesStatus"); // This is required to save the array of objects in MongoDB
    await existingUser.save();
}