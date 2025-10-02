"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function FilterInput({
    filterName,
    filterOptions,
    label,
}: {
    filterName: string;
    filterOptions: { value: string; label: string }[];
    label: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [filter, setFilter] = useState("");

    function handleChange(filterName: string, value: string) {
        const params = new URLSearchParams(searchParams);
        if (value === "all") {
            setFilter("");
            params.delete(filterName);
        } else {
            setFilter(value);
            params.set(filterName, value);
        }
        router.replace(`?${params.toString()}`);
    }

    return (
        <div className="grid grid-cols-1 gap-1">
            <label className="text-xs text-gray-500">{label}</label>
            <Select
                value={filter}
                onValueChange={(value) => handleChange(filterName, value)}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem
                        value="all"
                        className="text-gray-400 focus:text-gray-400"
                    >
                        All
                    </SelectItem>
                    {filterOptions.map((o) => (
                        <SelectItem key={o.value} value={o.value}>
                            {o.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
