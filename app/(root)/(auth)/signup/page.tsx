"use client";
import { Navbar } from "@/components/shared/navbar";
import { SignUpForm } from "../_components/signup-form";

const SignUpPage = () => {
    return (
        <>
            <Navbar />
            <section className="h-full flex items-center justify-center h-screen">
                <SignUpForm />
            </section>
        </>
    );
};

export default SignUpPage;
