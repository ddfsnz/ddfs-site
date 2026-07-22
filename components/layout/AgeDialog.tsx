"use client";

import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/_ui/alert-dialog";

export function AgeDialog() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const isAgeConfirmed =
            sessionStorage.getItem("isAgeConfirmed") === "true";
        if (!isAgeConfirmed) {
            setOpen(true);
        }
    }, []);

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="mx-auto text-2xl font-bold">
                        Are you over 18?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="grid grid-cols-1">
                    <AlertDialogAction
                        onClick={() => {
                            sessionStorage.setItem("isAgeConfirmed", "true");
                            setOpen(false);
                        }}
                    >
                        Yes
                    </AlertDialogAction>
                    <AlertDialogCancel asChild>
                        <a href="https://www.google.com">No</a>
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
