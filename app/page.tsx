import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
                        <Link href="/wines" className="group">
                            <Image
                                src="/wines.png"
                                alt=""
                                height={800}
                                width={1200}
                                className="rounded-xl shadow-red-700/10 transition-all ease-in-out group-hover:scale-103 group-hover:shadow-2xl"
                            />
                            <h2 className="font-display mt-3 text-2xl font-semibold transition-colors group-hover:text-red-700">
                                Wines
                            </h2>
                            <p className="text-xs text-gray-500">
                                Discover a curated selection of premium wines
                                from New Zealand and around the world.
                            </p>
                        </Link>
                        <Link href="/beers" className="group">
                            <Image
                                src="/beers.png"
                                alt=""
                                height={800}
                                width={1200}
                                className="rounded-xl shadow-red-700/10 transition-all ease-in-out group-hover:scale-103 group-hover:shadow-2xl"
                            />
                            <h2 className="font-display mt-3 text-2xl font-semibold transition-colors group-hover:text-red-700">
                                Beers
                            </h2>
                            <p className="text-xs text-gray-500">
                                Enjoy local craft brews and international
                                favorites, perfect for every beer enthusiast.
                            </p>
                        </Link>
                        {/* <Link href="/ciders" className="group">
                            <Image
                                src="/ciders.png"
                                alt=""
                                height={800}
                                width={1200}
                                className="rounded-xl shadow-red-700/10 transition-all ease-in-out group-hover:scale-103 group-hover:shadow-2xl"
                            />
                            <h2 className="font-display mt-3 text-2xl font-semibold transition-colors group-hover:text-red-700">
                                Ciders
                            </h2>
                            <p className="text-xs text-gray-500">
                                Taste crisp, refreshing ciders made from the
                                finest New Zealand apples.
                            </p>
                        </Link> */}
                        <Link href="/spirits" className="group">
                            <Image
                                src="/spirits.png"
                                alt=""
                                height={800}
                                width={1200}
                                className="rounded-xl shadow-red-700/10 transition-all ease-in-out group-hover:scale-103 group-hover:shadow-2xl"
                            />
                            <h2 className="font-display mt-3 text-2xl font-semibold transition-colors group-hover:text-red-700">
                                Spirits
                            </h2>
                            <p className="text-xs text-gray-500">
                                Explore top-shelf spirits, including whisky,
                                gin, vodka, and more from renowned distilleries.
                            </p>
                        </Link>
                        <Link href="/liqueurs" className="group">
                            <Image
                                src="/liqueurs.png"
                                alt=""
                                height={800}
                                width={1200}
                                className="rounded-xl shadow-red-700/10 transition-all ease-in-out group-hover:scale-103 group-hover:shadow-2xl"
                            />
                            <h2 className="font-display mt-3 text-2xl font-semibold transition-colors group-hover:text-red-700">
                                Liqueurs
                            </h2>
                            <p className="text-xs text-gray-500">
                                Indulge in smooth, flavorful liqueurs ideal for
                                sipping or mixing in cocktails.
                            </p>
                        </Link>
                        <Link href="/ports" className="group">
                            <Image
                                src="/ports.png"
                                alt=""
                                height={800}
                                width={1200}
                                className="rounded-xl shadow-red-700/10 transition-all ease-in-out group-hover:scale-103 group-hover:shadow-2xl"
                            />
                            <h2 className="font-display mt-3 text-2xl font-semibold transition-colors group-hover:text-red-700">
                                Ports
                            </h2>
                            <p className="text-xs text-gray-500">
                                Savor rich, aged ports with deep flavors,
                                perfect for after-dinner enjoyment.
                            </p>
                        </Link>
                        <Link href="/tobacco" className="group">
                            <Image
                                src="/tobacco.png"
                                alt=""
                                height={800}
                                width={1200}
                                className="rounded-xl shadow-red-700/10 transition-all ease-in-out group-hover:scale-103 group-hover:shadow-2xl"
                            />
                            <h2 className="font-display mt-3 text-2xl font-semibold transition-colors group-hover:text-red-700">
                                Tobacco
                            </h2>
                            <p className="text-xs text-gray-500">
                                Choose from a range of premium tobacco products
                                for discerning connoisseurs.
                            </p>
                        </Link>
                        <Link href="/honey" className="group">
                            <Image
                                src="/honey.png"
                                alt=""
                                height={600}
                                width={1200}
                                className="rounded-xl shadow-red-700/10 transition-all ease-in-out group-hover:scale-103 group-hover:shadow-2xl"
                            />
                            <h2 className="font-display mt-3 text-2xl font-semibold transition-colors group-hover:text-red-700">
                                Manuka Honey
                            </h2>
                            <p className="text-xs text-gray-500">
                                Experience pure New Zealand Manuka honey, prized
                                for its unique taste and health benefits.
                            </p>
                        </Link>
                        <Link href="/specialty" className="group">
                            <Image
                                src="/specialty.png"
                                alt=""
                                height={800}
                                width={1200}
                                className="rounded-xl shadow-red-700/10 transition-all ease-in-out group-hover:scale-103 group-hover:shadow-2xl"
                            />
                            <h2 className="font-display mt-3 text-2xl font-semibold transition-colors group-hover:text-red-700">
                                Specialty Products
                            </h2>
                            <p className="text-xs text-gray-500">
                                Discover specialty products like premium olive
                                oils, crafted for exceptional flavor and
                                quality.
                            </p>
                        </Link>
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
