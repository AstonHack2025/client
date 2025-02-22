"use client";
import { useCurrentUser } from "@/hooks/use-session";
import { NewPasswordForm } from "../_components/new-password-form";
import { Navbar } from "@/components/shared/navbar";
import { useState } from "react";

const NewPasswordPage = () => {
    const user = useCurrentUser();
    const [score, setScore] = useState<number>(user?.coursesStatus?.length || 0);
    return (
        <>
            <Navbar score={score} />
            <section className="h-full flex items-center justify-center h-screen">
                <NewPasswordForm />
            </section>
        </>
    );
};

export default NewPasswordPage;
