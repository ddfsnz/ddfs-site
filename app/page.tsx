import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <main className="relative">
            <div className="absolute inset-0 aspect-[2/1] bg-[url('/hero-homepage.png')] bg-contain bg-no-repeat"></div>
            <div className="absolute inset-0 aspect-[2/1] bg-gradient-to-b from-white/75 to-white"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 pt-40">
                <div className="mb-20 text-center">
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
                            Discover a curated selection of premium wines from
                            New Zealand and around the world.
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
                            Enjoy local craft brews and international favorites,
                            perfect for every beer enthusiast.
                        </p>
                    </Link>
                    <Link href="/ciders" className="group">
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
                            Taste crisp, refreshing ciders made from the finest
                            New Zealand apples and pears.
                        </p>
                    </Link>
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
                            Explore top-shelf spirits, including whisky, gin,
                            vodka, and more from renowned distilleries.
                        </p>
                    </Link>
                    <Link href="/liquers" className="group">
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
                            Savor rich, aged ports with deep flavors, perfect
                            for after-dinner enjoyment.
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
                            Choose from a range of premium tobacco products for
                            discerning connoisseurs.
                        </p>
                    </Link>
                    <Link href="/honey" className="group">
                        <Image
                            src="/honey.png"
                            alt=""
                            height={800}
                            width={1200}
                            className="rounded-xl shadow-red-700/10 transition-all ease-in-out group-hover:scale-103 group-hover:shadow-2xl"
                        />
                        <h2 className="font-display mt-3 text-2xl font-semibold transition-colors group-hover:text-red-700">
                            Manuka Honey
                        </h2>
                        <p className="text-xs text-gray-500">
                            Experience pure New Zealand Manuka honey, prized for
                            its unique taste and health benefits.
                        </p>
                    </Link>
                </div>
            </div>
        </main>
    );
}
