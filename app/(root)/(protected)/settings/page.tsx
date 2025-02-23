"use client";
import { Navbar } from "@/components/shared/navbar";
import { SettingsForm } from "../_components/settings-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import MergedForm from "../_components/customizations-form";

const SettingsPage = () => {
    return (
        <div className="h-screen">
            <Navbar />
            <section className="grid grid-cols-5">
                <div className="col-span-3 pt-10 px-5">
                    <Card className="flex flex-col justify-center p-5">
                        <div className="flex flex-col items-center">
                            <CardHeader className="text-4xl font-semibold">Customization</CardHeader>
                            <p className="text-lg mt-2">Tell us more about yourself!</p>
                        </div>
                        <CardContent className="p-5 flex flex-col">
                            <MergedForm />
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-2 pt-10 px-5">
                    <SettingsForm />
                </div>
            </section>
        </div>
    );
};

export default SettingsPage;
