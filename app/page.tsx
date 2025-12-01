import Image from "next/image";
import Link from "next/link";
import { CATALOG_IDS } from "@/app/[catalog]/config";
import { sanity } from "@/lib/sanity";
import { getImageSrc } from "@/lib/sanity-image";
import { CatalogConfig } from "@/types/catalog";

export default async function Page() {
    const catalogIds = Object.values(CATALOG_IDS).map((id) => id);
    const catalogConfigs = await sanity.fetch<CatalogConfig[]>(
        `*[_type == "category" && _id in $catalogIds]`,
        { catalogIds },
    );
    const sortedCatalogConfigs = catalogIds
        .map((id) => catalogConfigs.find((cfg) => cfg._id === id))
        .filter(Boolean);

    return (
        <main className="relative">
            <div className="absolute inset-0 aspect-[2/1] bg-[url('/hero-homepage.png')] bg-contain bg-no-repeat"></div>
            <div className="absolute inset-0 aspect-[2/1] bg-gradient-to-b from-white/80 to-white"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 pt-40">
                <div className="grid gap-24">
                    <div className="text-center">
                        <h1 className="font-display mb-2 text-5xl font-bold text-red-700 sm:text-7xl">
                            Diplomatic Duty Free Services
                        </h1>
                        <p className="text-gray-700">
                            New Zealand’s trusted supplier of duty free wines,
                            spirits, tobacco, and specialty products.
                        </p>
                    </div>
                    <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
                        {sortedCatalogConfigs.map((c) =>
                            c ? (
                                <Link
                                    key={c._id}
                                    href={"/wines"}
                                    className="group"
                                >
                                    <Image
                                        src={getImageSrc(c.tileImage) || ""}
                                        alt=""
                                        height={800}
                                        width={1200}
                                        className="rounded-xl shadow-red-700/10 transition-all ease-in-out group-hover:scale-103 group-hover:shadow-2xl"
                                    />
                                    <h2 className="font-display mt-3 text-2xl font-semibold transition-colors group-hover:text-red-700">
                                        {c.name}
                                    </h2>
                                    <p className="text-xs text-gray-500">
                                        {c.description}
                                    </p>
                                </Link>
                            ) : null,
                        )}
                    </div>
                    <section
                        id="about"
                        className="flex flex-col items-center gap-10 md:flex-row md:gap-16"
                    >
                        <div className="md:w-1/2">
                            <h2 className="font-display mb-4 text-3xl font-bold text-red-700">
                                About DDFS
                            </h2>
                            <div className="grid gap-3 text-sm text-gray-700">
                                <p>
                                    Diplomatic Duty Free Services (DDFS) is New
                                    Zealand’s only registered supplier dedicated
                                    exclusively to the diplomatic community.
                                    Family owned and operated since 2005, DDFS
                                    is based in Wellington and proudly serves
                                    embassies, high commissions, and consulates
                                    from around the globe.
                                </p>
                                <p>
                                    Our extensive selection includes premium
                                    wines, spirits, tobacco, fragrances, Manuka
                                    honey, and olive oil—all available duty
                                    free. Use our website to explore our product
                                    range, place your next order, and enjoy a
                                    seamless duty free shopping experience. We
                                    look forward to assisting you.
                                </p>
                                <p>
                                    Jordan Collicoat, CEO, Diplomatic Duty Free
                                    Services New Zealand
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center md:w-1/2">
                            <Image
                                src="/hero-homepage.png"
                                alt=""
                                width={500}
                                height={350}
                                className="rounded-xl object-cover"
                            />
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
