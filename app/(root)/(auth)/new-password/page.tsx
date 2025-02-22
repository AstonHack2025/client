"use client";
import { NewPasswordForm } from "../_components/new-password-form";
import { Navbar } from "@/components/shared/navbar";

const NewPasswordPage = () => {
    
    return (
        <>
            <Navbar />
            <section className="h-full flex items-center justify-center h-screen">
                <NewPasswordForm />
            </section>
        </>
    );
};

export default NewPasswordPage;
