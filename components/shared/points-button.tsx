"use client";

import Link from "next/link";
interface PointsButtonProps {
    score: number;
}

export const PointsButton: React.FC<PointsButtonProps> = ({ score }) => {
    return (
        <div>
            <Link href="/leaderboards" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" prefetch={false}>
                Score: <b>{score}</b> {/* display the score */}
            </Link>
        </div>
    );
};