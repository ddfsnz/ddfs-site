"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export function SearchInput({
    initialValue,
    label,
}: {
    initialValue: string;
    label: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        const params = new URLSearchParams(searchParams);
        if (e.target.value) {
            params.set("search", e.target.value);
        } else {
            params.delete("search");
        }
        router.replace(`?${params.toString()}`);
    }

    return (
        <div className="grid grid-cols-1 gap-1">
            <label className="text-xs text-gray-500">{label}</label>
            <Input
                value={value}
                onChange={handleChange}
                placeholder="Search..."
            />
        </div>
    );
}
