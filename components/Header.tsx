import { Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";

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
                                    <Link href="/about" className="font-medium">
                                        About DDFS
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Button>
                        Cart <ShoppingCart />
                    </Button>
                    <Button size="icon" variant="ghost" className="sm:hidden">
                        <Menu />
                    </Button>
                </div>
            </div>
        </header>
    );
}
