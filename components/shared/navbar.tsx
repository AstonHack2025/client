"use client";

import Link from "next/link";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { UserButton } from "@/components/shared/user-button";
import { useTheme } from "next-themes";

export const Navbar = () => {
    const { theme, setTheme } = useTheme();
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white dark:border-gray-800 dark:bg-gray-950 shadow-md">
            <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
                {/* Left: Logo */}
                <div className="flex flex-shrink-0">
                    <Link href="/dashboard">
                        <div className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r dark:from-white from-black via-cyan-400 to-blue-500 dark:via-cyan-400 dark:to-blue-500">Student Buddy</div>
                    </Link>
                </div>

                {/* Right: User Button & Mode Toggle */}
                <div className="flex items-center space-x-4 flex-shrink-0">
                    <UserButton />
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
};
