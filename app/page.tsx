import Image from "next/image";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="mb-20 text-center">
                <h1 className="font-display mb-2 text-5xl font-bold text-red-700 sm:text-7xl">
                    Diplomatic Duty Free Services
                </h1>
                <p className="text-gray-500">Wellington New Zealand</p>
            </div>
            <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
                <Link
                    href="/wines"
                    className="overflow-hidden rounded-md border transition-colors hover:bg-gray-50 hover:text-red-700"
                >
                    <Image src="/wines.png" alt="" height={800} width={1200} />
                    <h2 className="font-display my-2 text-2xl font-semibold transition-colors">
                        Wines
                    </h2>
                </Link>
                <Link
                    href="/beers"
                    className="overflow-hidden rounded-md border transition-colors hover:bg-gray-50 hover:text-red-700"
                >
                    <Image src="/beers.png" alt="" height={800} width={1200} />
                    <h2 className="font-display my-2 text-2xl font-semibold transition-colors">
                        Beers
                    </h2>
                </Link>
                <Link
                    href="/ciders"
                    className="overflow-hidden rounded-md border transition-colors hover:bg-gray-50 hover:text-red-700"
                >
                    <Image src="/ciders.png" alt="" height={800} width={1200} />
                    <h2 className="font-display my-2 text-2xl font-semibold transition-colors">
                        Ciders
                    </h2>
                </Link>
                <Link
                    href="/spirits"
                    className="overflow-hidden rounded-md border transition-colors hover:bg-gray-50 hover:text-red-700"
                >
                    <Image
                        src="/spirits.png"
                        alt=""
                        height={800}
                        width={1200}
                    />
                    <h2 className="font-display my-2 text-2xl font-semibold transition-colors">
                        Spirits
                    </h2>
                </Link>
                <Link
                    href="/liquers"
                    className="overflow-hidden rounded-md border transition-colors hover:bg-gray-50 hover:text-red-700"
                >
                    <Image
                        src="/liqueurs.png"
                        alt=""
                        height={800}
                        width={1200}
                    />
                    <h2 className="font-display my-2 text-2xl font-semibold transition-colors">
                        Liqueurs
                    </h2>
                </Link>
                <Link
                    href="/ports"
                    className="overflow-hidden rounded-md border transition-colors hover:bg-gray-50 hover:text-red-700"
                >
                    <Image src="/ports.png" alt="" height={800} width={1200} />
                    <h2 className="font-display my-2 text-2xl font-semibold transition-colors">
                        Ports
                    </h2>
                </Link>
                <Link
                    href="/tobacco"
                    className="overflow-hidden rounded-md border transition-colors hover:bg-gray-50 hover:text-red-700"
                >
                    <Image
                        src="/tobacco.png"
                        alt=""
                        height={800}
                        width={1200}
                    />
                    <h2 className="font-display my-2 text-2xl font-semibold transition-colors">
                        Tobacco
                    </h2>
                </Link>
                <Link
                    href="/honey"
                    className="overflow-hidden rounded-md border transition-colors hover:bg-gray-50 hover:text-red-700"
                >
                    <Image src="/honey.png" alt="" height={800} width={1200} />
                    <h2 className="font-display my-2 text-2xl font-semibold transition-colors">
                        Manuka Honey
                    </h2>
                </Link>
            </div>
        </>
    );
}
