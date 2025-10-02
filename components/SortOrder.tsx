"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
    const current = searchParams.get("sort") || SORT_OPTIONS[0].value;

    function handleChange(value: string) {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (value === "name asc") {
            params.delete("sort");
        } else {
            params.set("sort", value);
        }
        router.replace(`?${params.toString()}`);
    }

    return (
        <Select value={current} onValueChange={handleChange}>
            <SelectTrigger size="sm" className="w-[180px]">
                <SelectValue placeholder="Sort Order" />
            </SelectTrigger>
            <SelectContent>
                {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                        {o.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
