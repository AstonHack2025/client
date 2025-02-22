"use client";
import { Navbar } from "@/components/shared/navbar";
import { SettingsForm } from "../_components/settings-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SettingsPage = () => {
    return (
        <>
            <Navbar />
            <section className="h-full flex items-center justify-center h-screen">
                <div className="flex-auto w-[70%] h-full py-10 pl-10">
                    <Card className="w-full h-[50%]">
                        <CardHeader className="text-2xl font-semibold text-center">Badges</CardHeader>
                        <div className="border-b-2 border-black w-[90%] m-auto dark:border-white"></div>
                        <CardContent className="pl-10 pt-5 "></CardContent>
                    </Card>
                </div>
                <div className="flex-auto w-[30%] h-full p-10 ">
                    <SettingsForm />
                </div>
            </section>
        </>
    );
};

export default SettingsPage;
