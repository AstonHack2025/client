"use client";
import { Navbar } from "@/components/shared/navbar";
import { SignInForm } from "../_components/signin-form";

const SignInPage = () => {
    return (
        <>
            <Navbar />
            <section className="h-full flex items-center justify-center h-screen">
                <SignInForm />
            </section>
        </>
    );
};

export default SignInPage;
