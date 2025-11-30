import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/_ui/button";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/_ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/_ui/sheet";
import { CartSheet } from "@/components/cart/CartSheet";
import { GSTSwitch } from "@/components/price/GSTSwitch";

export function Header() {
    return (
        <header className="bg-background fixed top-0 z-50 w-full border-b p-2 sm:p-3">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
                <Link href="/" className="relative h-auto w-24">
                    <Image
                        src="/logo-red-horizontal.png"
                        height={64}
                        width={240}
                        alt="Diplomatic Duty Free Services New Zealand"
                    />
                </Link>
                <div className="flex items-center gap-2 sm:gap-4">
                    <NavigationMenu
                        className="hidden sm:flex"
                        delayDuration={0}
                    >
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Products
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="min-w-48">
                                    <NavigationMenuLink asChild>
                                        <Link href="/wines">Wines</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/beers">Beers</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/ciders">Ciders</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/spirits">Spirits</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/liquers">Liquers</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/ports">Ports</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/tobacco">Tobacco</Link>
                                    </NavigationMenuLink>
                                    <NavigationMenuLink asChild>
                                        <Link href="/honey">Manuka Honey</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/#about"
                                        className="font-medium"
                                    >
                                        About DDFS
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="hidden sm:block">
                        <GSTSwitch />
                    </div>
                    <CartSheet />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="sm:hidden"
                            >
                                <Menu />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-11/12 p-3 pt-12">
                            <GSTSwitch />
                            <NavigationMenu className="flex w-full max-w-full flex-col justify-start">
                                <span className="w-full p-2 text-start text-sm font-semibold">
                                    Products
                                </span>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/wines"
                                        className="w-full text-start"
                                    >
                                        Wines
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/beers"
                                        className="w-full text-start"
                                    >
                                        Beers
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/ciders"
                                        className="w-full text-start"
                                    >
                                        Ciders
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/spirits"
                                        className="w-full text-start"
                                    >
                                        Spirits
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/liquers"
                                        className="w-full text-start"
                                    >
                                        Liquers
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/ports"
                                        className="w-full text-start"
                                    >
                                        Ports
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/tobacco"
                                        className="w-full text-start"
                                    >
                                        Tobacco
                                    </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/honey"
                                        className="w-full text-start"
                                    >
                                        Manuka Honey
                                    </Link>
                                </NavigationMenuLink>
                                <hr className="my-4 w-full" />
                                <NavigationMenuLink asChild>
                                    <Link
                                        href="/#about"
                                        className="w-full text-start font-medium"
                                    >
                                        About DDFS
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenu>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
