"use client";

import { ErrorCard } from "@/components/shared/error-card";
import { Navbar } from "@/components/shared/navbar";
import { useCurrentUser } from "@/hooks/use-session";
import { useState } from "react";

const AuthErrorPage = () => {
    const user = useCurrentUser();
    const [score, setScore] = useState<number>(user?.coursesStatus?.length || 0);
    return (
        <>
            <Navbar score={score}/>
            <section className="h-full flex items-center justify-center h-screen">
                <ErrorCard />
            </section>
        </>
    );
};

export default AuthErrorPage;
