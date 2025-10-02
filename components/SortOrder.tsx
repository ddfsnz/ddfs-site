"use client";
import { ArrowDownWideNarrow } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const SORT_OPTIONS = [
    { label: "Name", value: "name asc" },
    { label: "Price (Low-High)", value: "price asc" },
    { label: "Price (High-Low)", value: "price desc" },
    { label: "Company", value: "company->name asc" },
    { label: "Style", value: "beerOptions.style->name asc" },
    { label: "ABV", value: "beerOptions.abv asc" },
];

export function SortOrder() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [sort, setSort] = useState(
        searchParams.get("sort") || SORT_OPTIONS[0].value,
    );
    const [open, setOpen] = useState(false);

    function handleChange(value: string) {
        setSort(value);
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (value === "name asc") {
            params.delete("sort");
        } else {
            params.set("sort", value);
        }
        router.replace(`?${params.toString()}`);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="text-xs">
                    {SORT_OPTIONS.find((o) => o.value === sort)?.label}{" "}
                    <ArrowDownWideNarrow />{" "}
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="flex w-min flex-col p-1">
                {SORT_OPTIONS.map((o) => (
                    <Button
                        key={o.value}
                        onClick={() => handleChange(o.value)}
                        size="sm"
                        variant="ghost"
                        className="justify-start text-xs"
                    >
                        {o.label}
                    </Button>
                ))}
            </PopoverContent>
        </Popover>
    );
}
