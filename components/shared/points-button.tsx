"use client";

import Link from "next/link";


export const PointsButton = () => {
    return (
        <div>
            <Link href="/leaderboards" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
            </Link>
        </div>
    );
};