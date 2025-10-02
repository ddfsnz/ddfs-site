"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export function SearchInput({ initialValue }: { initialValue: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        if (e.target.value) {
            params.set("search", e.target.value);
        } else {
            params.delete("search");
        }
        router.replace(`?${params.toString()}`);
    }

    return (
        <Input value={value} onChange={handleChange} placeholder="Search..." />
    );
}
