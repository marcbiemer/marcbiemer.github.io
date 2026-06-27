"use client";

import { useEffect, useState } from "react";

type Props = {
    location: string;
    timezone: string;
    className?: string;
    useTimeOnly?: boolean;
};

export default function Clock({ location, timezone, className, useTimeOnly = false }: Props) {
    const [time, setTime] = useState(() => new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const date = time.toLocaleDateString("en-GB", {
        timeZone: timezone,
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const clock = time.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    const offset = time
        .toLocaleDateString("en-GB", {
            timeZone: timezone,
            timeZoneName: "shortOffset",
        })
        .split(", ")[1];

    return (
        <>
            {useTimeOnly && (
                <time dateTime={clock} suppressHydrationWarning>
                    {" "}
                    {clock}
                </time>
            )}
            {!useTimeOnly && (
                <>
                    <span className={className}>
                        {location}
                        <time dateTime={clock} suppressHydrationWarning>
                            {" "}
                            {clock}
                        </time>
                    </span>
                    <span className={className}>
                        <time dateTime={date} suppressHydrationWarning>
                            {date}
                        </time>
                        {` (${offset})`}
                    </span>
                </>
            )}
        </>
    );
}
