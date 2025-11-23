import Image from "next/image";
import Link from "next/link";

export function Footer() {
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
                        <Link
                            href="/wines"
                            className="transition-colors hover:text-red-700"
                        >
                            Wines
                        </Link>
                        <Link
                            href="/beers"
                            className="transition-colors hover:text-red-700"
                        >
                            Beers
                        </Link>
                        <Link
                            href="/ciders"
                            className="transition-colors hover:text-red-700"
                        >
                            Ciders
                        </Link>
                        <Link
                            href="/spirits"
                            className="transition-colors hover:text-red-700"
                        >
                            Spirits
                        </Link>
                        <Link
                            href="/liquers"
                            className="transition-colors hover:text-red-700"
                        >
                            Liquers
                        </Link>
                        <Link
                            href="/ports"
                            className="transition-colors hover:text-red-700"
                        >
                            Ports
                        </Link>
                        <Link
                            href="/tobacco"
                            className="transition-colors hover:text-red-700"
                        >
                            Tobacco
                        </Link>
                        <Link
                            href="/honey"
                            className="transition-colors hover:text-red-700"
                        >
                            Manuka Honey
                        </Link>
                    </div>
                    <div className="flex flex-col gap-3 font-medium">
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
