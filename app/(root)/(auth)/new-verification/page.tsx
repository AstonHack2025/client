"use client";
import { Navbar } from "@/components/shared/navbar";
import { NewVerificationForm } from "../_components/new-verification-form";

const NewVerificationPage = () => {
    return (
        <>
            <Navbar />
            <section className="h-full flex items-center justify-center h-screen">
                <NewVerificationForm />
            </section>
        </>
    );
};

export default NewVerificationPage;
