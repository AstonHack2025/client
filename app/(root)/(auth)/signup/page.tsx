"use client";
import { Navbar } from "@/components/shared/navbar";
import { SignUpForm } from "../_components/signup-form";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-session";

const SignUpPage = () => {
    const user = useCurrentUser();
    const [score, setScore] = useState<number>(user?.coursesStatus?.length || 0);

    return (
        <>
            <Navbar score={score} />
            <section className="h-full flex items-center justify-center h-screen">
                <SignUpForm />
            </section>
        </>
    );
};

export default SignUpPage;
