"use client";
import React from "react";

export const DisplayLocalTime: React.FC<{
    date: string;
}> = ({ date }) => {
    const [isMounted, setIsMounted] = React.useState(false);

    const formattedDate = new Date(date).toLocaleString(undefined, {
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        month: "short",
        year: "numeric",
    });

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <span className="inline-block min-w-[120px]">
            {isMounted ? (
                formattedDate
            ) : (
                <span className="text-transparent bg-slate-200 rounded animate-pulse">
                    Apr 15, 2025, 10:30 AM
                </span>
            )}
        </span>
    );
};