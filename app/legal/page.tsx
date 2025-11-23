import { PortableText, PortableTextBlock } from "@portabletext/react";
import { notFound } from "next/navigation";
import { sanity } from "@/lib/sanity";

export default async function Page() {
    const page = await sanity.fetch<
        { title: string; content: PortableTextBlock[] } | undefined
    >(
        `*[_type == "page" && title == $title][0]{
            ...
        }`,
        { title: "Legal" },
    );
    console.log(page);

    if (!page) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-32 pt-40">
            <div className="grid grid-cols-1 gap-3">
                <h1 className="font-display mb-3 text-5xl font-bold text-red-700 sm:text-7xl">
                    Legal
                </h1>
                <PortableText value={page.content} />
            </div>
        </main>
    );
}
