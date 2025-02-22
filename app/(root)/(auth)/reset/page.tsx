"use client";
import { Navbar } from "@/components/shared/navbar";
import { ResetForm } from "../_components/reset-form";

const ResetPage = () => {
    return (
        <>
            <Navbar />
            <section className="h-full flex items-center justify-center h-screen">
                <ResetForm />
            </section>
        </>
    );
};

export default ResetPage;
