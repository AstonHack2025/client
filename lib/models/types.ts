import { Document } from "mongoose";

export enum UserProvider {
    CREDENTIALS = "credentials",
}

export enum CourseCompletionStatus {
    COMPLETED = "completed",
    IN_PROGRESS = "in-progress", // might be useful in the future
    NOT_STARTED = "not-started",
}

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    image?: string;
    provider: UserProvider;
    emailVerified: Date | null;
    isTwoFactorEnabled: boolean;
    emailPendingVerification?: string;
    createdAt: Date;
    updatedAt: Date;
}