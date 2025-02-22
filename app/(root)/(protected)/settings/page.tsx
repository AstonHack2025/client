"use client";
import { Navbar } from "@/components/shared/navbar";
import { SettingsForm } from "../_components/settings-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AcademicsForm from "../_components/academics-form";
import PersonalInfoForm from "../_components/Personal-info";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {

    function onsubmit(values: string[]) {
        console.log(values);
    }

    return (
        <>
            <Navbar />
            <section className="h-full flex items-center justify-center h-screen">
                <div className="flex-auto w-[70%] h-full py-10 pl-10">
                    <Card className="w-full h-[63.5%] ">
                        <CardHeader className="text-4xl font-semibold text-center mb-1">Customization</CardHeader>
                        <p className="text-center text-lg mt-2">Tell us more about yourself!</p>

                        <CardContent className="p-5 flex flex-col">
                            <div className="flex ">
                                <AcademicsForm />
                                <PersonalInfoForm />
                            </div>
                            <Button size="lg" className="w-[96%] mt-3 ml-6" type="submit" disabled={false}>
                                {"Next"}
                            </Button>
                        </CardContent>
                    </Card> 
                </div>
                <div className="flex-auto w-[30%] h-full p-10">
                    <SettingsForm />
                </div>
            </section>
        </>
    );
};

export default SettingsPage;
