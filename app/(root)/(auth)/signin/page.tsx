"use client";
import { Navbar } from "@/components/shared/navbar";
import { SignInForm } from "../_components/signin-form";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-session";

const SignInPage = () => {
    const user = useCurrentUser();
    const [score, setScore] = useState<number>(user?.coursesStatus?.length || 0);

    return (
        <>
            <Navbar score={score} />
            <section className="h-full flex items-center justify-center h-screen">
                <SignInForm />
            </section>
        </>
    );
};

export default SignInPage;
