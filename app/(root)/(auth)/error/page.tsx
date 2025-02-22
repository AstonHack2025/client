"use client";

import { ErrorCard } from "@/components/shared/error-card";
import { Navbar } from "@/components/shared/navbar";

const AuthErrorPage = () => {    
    return (
        <>
            <Navbar />
            <section className="h-full flex items-center justify-center h-screen">
                <ErrorCard />
            </section>
        </>
    );
};

export default AuthErrorPage;
