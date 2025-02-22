"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/shared/header";
import { BackButton } from "@/components/shared/back-button";

interface FormWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSignUp: boolean;
}

export const FormWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSignUp }: FormWrapperProps) => {
    return (
        <Card className="w-[360px] shadow-md py-4">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSignUp ? (
                <CardFooter>
                    <BackButton label={backButtonLabel} href={backButtonHref} />
                </CardFooter>
            ) : (
                <CardFooter>
                    <BackButton label={backButtonLabel} href={backButtonHref} />
                </CardFooter>
            )}
        </Card>
    );
};
