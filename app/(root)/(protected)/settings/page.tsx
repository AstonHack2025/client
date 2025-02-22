"use client";
import { Navbar } from "@/components/shared/navbar";
import { SettingsForm } from "../_components/settings-form";
import { useCurrentUser } from "@/hooks/use-session";
import { useState, useEffect, useId } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Badge from "@/components/shared/badge";
import { ICourse } from "@/lib/models/types";
import courseCategories from "@/constants/courses";
import { getColorFromRange } from "@/lib/utils";

const SettingsPage = () => {
    const user = useCurrentUser();
    const [score, setScore] = useState<number>(user?.coursesStatus?.length || 0);
    const [badges, setBadges] = useState<{ icon: string; stars: number; color: string; }[]>([]);

    useEffect(() => {
        if (user?.coursesStatus) {
            setScore(user.coursesStatus.length);
        }
    }, [user]);

    useEffect(() => {
        const courseCompletions = user?.coursesStatus?.reduce((acc: Record<string, string[]>, course: ICourse) => {
            const [category, ...parts] = course.id.split("-");
            const courseName: string = parts.join("-");
            if (acc[category]) acc[category].push(courseName);
            else acc[category] = [courseName];
            return acc;
        }, {});

        const data = Object.entries(courseCompletions ?? {}).map(([category, courses]) => {
            const percentageCompleted = (courses.length / courseCategories[category].length)
            const stars = percentageCompleted === 1 ? 3 : percentageCompleted >= 0.5 ? 2 : percentageCompleted === 0 ? 0 : 1;
            return { icon: category, stars, color: getColorFromRange(percentageCompleted) };
        });
        setBadges(data);
    }, [user?.coursesStatus]);

    return (
        <>
            <Navbar score={score} />
            <section className="h-full flex items-center justify-center h-screen">
                <div className="flex-auto w-[70%] h-full py-10 pl-10">
                    <Card className="w-full h-[50%]">
                        <CardHeader className="text-2xl font-semibold text-center">Badges</CardHeader>
                        <div className="border-b-2 border-black w-[90%] m-auto dark:border-white"></div>
                        <CardContent className="pl-10 pt-5 ">
                            {badges.map((badge) => (<Badge color={badge.color} icon={badge.icon} stars={badge.stars} />))}
                        </CardContent>
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
