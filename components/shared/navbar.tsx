"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { UserButton } from "@/components/shared/user-button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950 shadow-md">
            <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
                {/* Left: Logo */}
                <div className="flex flex-shrink-0 space-x-4 items-center">
                    <Button variant="default" onClick={() => router.back()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </Button>
                    <Link href="/dashboard">
                        <div className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r dark:from-white from-black via-cyan-500 to-blue-500 dark:via-cyan-400 dark:to-blue-500">Student Buddy</div>
                    </Link>
                </div>

                {/* Right: User Button & Mode Toggle */}
                <div className="flex items-center space-x-4 flex-shrink-0">
                    <Link href="/dashboard">
                        <p className="dark:text-gray-300">Dashboard</p>
                    </Link>
                    <Link href="/settings">
                        <p className="dark:text-gray-300">Settings</p>
                    </Link>
                    <UserButton />
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};
