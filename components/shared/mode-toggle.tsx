"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Toggle } from "../ui/toggle";
import { MoonIcon } from "@radix-ui/react-icons";

export const ModeToggle = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-10">
            <div className="flex items-center gap-4">
                <Toggle aria-label="Toggle dark mode" className="rounded-full">
                    <div className="w-5 text-gray-500 dark:text-gray-400">
                        <MoonIcon />
                    </div>
                </Toggle>
            </div>
        </Button>
    );
};
