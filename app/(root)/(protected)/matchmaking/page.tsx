"use client";
import Matchmaking from "../_components/matchmaking";

export default function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Matchmaking />
    </div>
  );
}   
