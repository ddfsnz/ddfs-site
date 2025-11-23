import {
    PortableText,
    PortableTextBlock,
    PortableTextComponents,
} from "@portabletext/react";
import { notFound } from "next/navigation";
import { sanity } from "@/lib/sanity";

const portableTextComponents: Partial<PortableTextComponents> = {
    marks: {
        link: ({ children, value }) => {
            const rel = !value.href.startsWith("/")
                ? "noreferrer noopener"
                : undefined;
            return (
                <a
                    href={value.href}
                    rel={rel}
                    className="text-red-700 underline"
                >
                    {children}
                </a>
            );
        },
    },
};

export default async function Page() {
    const page = await sanity.fetch<
        { title: string; content: PortableTextBlock[] } | undefined
    >(
        `*[_type == "page" && title == $title][0]{
            ...
        }`,
        { title: "Legal" },
    );

    if (!page) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-32 pt-40">
            <div className="grid grid-cols-1 gap-3">
                <h1 className="font-display mb-3 text-5xl font-bold text-red-700 sm:text-7xl">
                    Legal
                </h1>
                <PortableText
                    value={page.content}
                    components={portableTextComponents}
                />
            </div>
        </main>
    );
}
