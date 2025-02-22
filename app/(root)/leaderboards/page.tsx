"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/shared/navbar";
import { useCurrentUser } from "@/hooks/use-session";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaRegUserCircle } from "react-icons/fa";
import fetchAllUsers from "@/lib/actions/courses/fetchAllUsers";

const LeaderboardsPage: React.FC = () => {
    const user = useCurrentUser();
    const [score, setScore] = useState<number>(user?.coursesStatus?.length || 0);
    const [data, setData] = useState<[string, any | null, number, boolean][]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await fetchAllUsers();
                // @ts-ignore
                setData(users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <>
            <Navbar score={score} />
            <div className="flex justify-center pt-8">
                <div className="leaderboard w-full max-w-4xl">
                    <h1 className="text-4xl font-bold mb-6 text-center">Leaderboard</h1>
                    <table className="min-w-full table-auto border-collapse mx-auto text-lg">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 border-b text-left text-xl">Rank</th> {/*create the table headers*/}
                                <th className="px-6 py-4 border-b text-left text-xl">User</th>
                                <th className="px-6 py-4 border-b text-center text-xl">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => {
                                let rankImage = ""; {/*add medal images for the top 3*/ }
                                if (index === 0) rankImage = "/1st.svg";
                                else if (index === 1) rankImage = "/2nd.svg";
                                else if (index === 2) rankImage = "/3rd.svg";

                                return (
                                    <tr
                                        key={index}
                                        className={`border-b ${item[3] ? "bg-[#87CEEB]/40 backdrop-blur-sm dark:bg-white/15 backdrop-blur-sm text-black dark:text-white" : ""}`}
                                    >
                                        <td className="px-6 py-4 text-xl flex items-center gap-2">
                                            {rankImage ? (
                                                <img src={rankImage} alt={`${index + 1} place`} className="w-15 h-12" />
                                            ) : (
                                                <b><span className="w-15 h-12 flex items-center pl-4">{index + 1}</span></b> // Left-aligned but centered vertically
                                            )}
                                        </td>


                                        <td className="px-6 py-4 text-left text-xl">
                                            <div className="flex items-center gap-3">
                                                <Avatar> {/*show profile picture*/}
                                                    <AvatarImage src={item[1] ? item[1] : `https://api.dicebear.com/9.x/initials/svg?seed=${item[0]}`} />
                                                    <AvatarFallback className="bg-primary-500">
                                                        <FaRegUserCircle className="h-6 w-6" />
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span>{item[0]}</span> {/*show username */}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-left text-xl text-center">
                                            <span className="bg-[#d1f4e0] text-[#1aa150] relative max-w-fit inline-flex items-center justify-between box-border whitespace-nowrap px-1 h-6 text-small rounded-full">
                                                <div className="flex-1 text-inherit font-normal px-1">
                                                    {item[2]} {/*show score*/}
                                                </div>
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default LeaderboardsPage;
