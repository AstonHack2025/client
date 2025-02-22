"use client";
import { Navbar } from "@/components/shared/navbar";
import { ResetForm } from "../_components/reset-form";
import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-session";

const ResetPage = () => {
    const user = useCurrentUser();
    const [score, setScore] = useState<number>(user?.coursesStatus?.length || 0);

    return (
        <>
            <Navbar score={score} />
            <section className="h-full flex items-center justify-center h-screen">
                <ResetForm />
            </section>
        </>
    );
};

export default ResetPage;
