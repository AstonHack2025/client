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
        <div className="h-screen">
            <Navbar />
            <section className="grid grid-cols-5">
                <div className="col-span-3 p-10 ">
                    <Card className="flex flex-col justify-center p-5">
                        <div className="flex flex-col items-center">
                            <CardHeader className="text-4xl font-semibold">Customization</CardHeader>
                            <p className="text-lg mt-2">Tell us more about yourself!</p>
                        </div>
                        <CardContent className="p-5 flex flex-col">
                            <div className="grid grid-cols-2">
                                <AcademicsForm />
                                <PersonalInfoForm />
                                <div className="col-span-2 px-6">
                                    <Button size="lg" className="w-full mt-3" type="submit" disabled={false}>
                                    {"Next"}
                                    </Button>
                                </div>
                                
                            </div>
                            
                        </CardContent>
                    </Card> 
                </div>
                <div className="col-span-2 p-10">
                    <SettingsForm />
                </div>
            </section>
            
        </div>
    );
};

export default SettingsPage;
