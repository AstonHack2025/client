// "use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shapes } from "@/components/shared/Shapes";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-b from-blue-900 to-blue-100 dark:bg-gradient-to-b dark:from-black dark:via-gray-900 dark:to-blue-900">
      <div className="flex items-center justify-center h-full space-x-40">
        <div className="flex flex-col items-start justify-center space-y-6">
          <h1 className="text-8xl font-bold">Study Buddy</h1>
          <p className="text-4xl">Connecting Students in need</p>
          <Link href="/signup">
            <Button variant="default" size="lg" className="text-xl py-6">Get Started</Button>
          </Link>
        </div>
        <Shapes />
      </div>
    </div>
  );
}
