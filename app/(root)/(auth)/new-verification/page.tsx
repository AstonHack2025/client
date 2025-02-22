"use client";
import { Navbar } from "@/components/shared/navbar";
import { NewVerificationForm } from "../_components/new-verification-form";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-session";

const NewVerificationPage = () => {
    const user = useCurrentUser();
    const [score, setScore] = useState<number>(user?.coursesStatus?.length || 0);

    return (
        <>
            <Navbar score={score} />
            <section className="h-full flex items-center justify-center h-screen">
                <NewVerificationForm />
            </section>
        </>
    );
};

export default NewVerificationPage;
