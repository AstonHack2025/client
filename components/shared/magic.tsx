"use client";
import { useState, useId } from "react";
import "@/public/customcss.css";

interface MagicProps {
    complete: boolean;
    onToggle: () => void;
}

export default function Magic({ complete, onToggle }: MagicProps) {
    const id: string = useId();
    return (
        <div className="checkbox-wrapper-11">
            <input
                id={id}
                type="checkbox"
                name="r"
                checked={complete} // Tie checked state to prop
                onChange={onToggle} // Call function to toggle state
            />
            <label htmlFor={id}>{complete ? "Completed" : "Complete"}</label>
        </div>
    );
}
