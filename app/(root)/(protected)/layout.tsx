"use client";

import { useCurrentUser } from "@/hooks/use-session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const user = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/signin");
        }
    }, [user, router]);

    if (!user) {
        return null; // Prevent rendering while redirecting
    }

    return <div>{children}</div>;
};

export default ProtectedLayout;
