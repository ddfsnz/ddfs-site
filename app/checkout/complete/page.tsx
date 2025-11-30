import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/_ui/button";

export default function Page() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-32 pt-40">
            <div className="grid grid-cols-1 gap-3">
                <h1 className="font-display mb-3 text-5xl font-bold text-red-700 sm:text-7xl">
                    Order Submitted
                </h1>
                <p>
                    Your order has been submitted. Details will be emailed to
                    you.
                </p>
                <Link href="/">
                    <Button>
                        <Home />
                        Go Home
                    </Button>
                </Link>
            </div>
        </main>
    );
}
