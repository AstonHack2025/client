"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Header } from "@/components/shared/header";
import { BackButton } from "@/components/shared/back-button";

interface FormWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
}

export const FormWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref }: FormWrapperProps) => {
    return (
        <Card className="w-[360px] shadow-md py-4">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
};
