// "use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h1 className="text-6xl font-bold">Study Buddy</h1>
        <p className="text-3xl">Connecting Students in need</p>
        <Link href="/signup">
            <Button variant="default" size="lg">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
