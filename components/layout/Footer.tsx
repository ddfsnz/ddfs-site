import Image from "next/image";
import Link from "next/link";
import { CATALOG_IDS } from "@/app/[catalog]/config";
import { FOOTER_PDF_IDS, sanity } from "@/lib/sanity";
import { CatalogConfig } from "@/types/catalog";
import { Pdf } from "@/types/pdf";

export async function Footer() {
    const catalogIds = Object.values(CATALOG_IDS).map((id) => id);
    const [catalogConfigs, pdfs] = await Promise.all([
        sanity.fetch<CatalogConfig[]>(
            `*[_type == "category" && _id in $catalogIds]`,
            { catalogIds },
        ),
        sanity.fetch<Pdf[]>(
            `*[_type == "pdfs" && id in $pdfIds] {
                id,
                name,
                "url": file.asset->url
            }`,
            { pdfIds: FOOTER_PDF_IDS },
        ),
    ]);

    const footerPdfs = FOOTER_PDF_IDS.map((id) =>
        pdfs.find((pdf) => pdf.id === id),
    ).filter((pdf): pdf is Pdf => pdf?.url != null);

    return (
        <footer className="border-t bg-gray-50 px-2 py-10 pb-20 sm:px-3 sm:py-16 sm:pr-20 sm:pb-20 2xl:pr-0">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row sm:items-start">
                <Link href="/" className="relative h-auto w-36">
                    <Image
                        src="/logo-red-horizontal.png"
                        height={64}
                        width={240}
                        alt="Diplomatic Duty Free Services New Zealand"
                    />
                </Link>
                <nav className="flex flex-col gap-12 text-center text-sm sm:flex-row sm:text-left">
                    <div className="flex flex-col gap-3">
                        <h2 className="font-medium">Products</h2>
                        {Object.keys(CATALOG_IDS).map((c) => (
                            <Link
                                key={c}
                                href={`/${c}`}
                                className="transition-colors hover:text-red-700"
                            >
                                {
                                    catalogConfigs.find(
                                        (cf) =>
                                            cf._id ===
                                            CATALOG_IDS[
                                                c as keyof typeof CATALOG_IDS
                                            ],
                                    )?.name
                                }
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-3 font-medium">
                        {footerPdfs.map((pdf) => (
                            <a
                                key={pdf.id}
                                href={pdf.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-red-700"
                            >
                                {pdf.name}
                            </a>
                        ))}
                        <Link
                            href="/#about"
                            className="transition-colors hover:text-red-700"
                        >
                            About DDFS
                        </Link>
                        <Link
                            href="/legal"
                            className="transition-colors hover:text-red-700"
                        >
                            Legal
                        </Link>
                    </div>
                </nav>
            </div>
        </footer>
    );
}
