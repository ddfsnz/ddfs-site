import { Home, ShoppingCart } from "lucide-react";
import { notFound } from "next/navigation";
import { BeerBadges } from "@/components/BeerBadges";
import { DisplayPrice } from "@/components/DisplayPrice";
import { ProductImage } from "@/components/ProductImage";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { sanity } from "@/lib/sanity";
import { Beer } from "@/types/product";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const beer = await sanity.fetch<Beer | undefined>(
        `*[_type == "product" && _id == $id][0]{
            ...,
            company->{
                ...,
                name
            },
            beerOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
        { id: id },
    );

    if (!beer) {
        notFound();
    }

    return (
        <div className="grid grid-cols-1 gap-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">
                            <Home className="size-4" />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/beers">Beers</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:gap-6">
                <div className="overflow-hidden rounded-lg border">
                    <ProductImage product={beer} />
                </div>
                <div className="grid h-min gap-4 md:pt-3 lg:pt-6 lg:pr-3 lg:pb-6">
                    <div className="grid gap-2">
                        <span className="text-xs text-gray-500">
                            {beer.code}
                        </span>
                        <h1 className="font-display text-3xl font-bold">
                            {beer.name}
                        </h1>
                        <span className="text-gray-500">
                            {beer.company.name}
                        </span>
                        <BeerBadges beerOptions={beer.beerOptions} />
                    </div>
                    <div className="grid gap-1">
                        <label className="text-xs font-light text-gray-500">
                            Pack Size
                        </label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pack Size..." />
                            </SelectTrigger>
                            <SelectContent>
                                {beer.beerOptions.quantity.map((o) => (
                                    <SelectItem key={o} value={String(o)}>
                                        {o} Pack
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-1">
                        <label className="text-xs font-light text-gray-500">
                            Quantity
                        </label>
                        <Input
                            type="number"
                            defaultValue={beer.quantity[0]}
                            min={1}
                            max={beer.quantity[beer.quantity.length - 1]}
                        />
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-3">
                        <span className="font-display mt-auto text-2xl font-bold text-red-700">
                            <DisplayPrice price={beer.price} />{" "}
                            <span className="text-xs font-semibold">+GST</span>
                        </span>
                        <Button>
                            Add to Cart <ShoppingCart />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-12 w-full max-w-3xl">
                <h2 className="font-display text-2xl font-bold">
                    Product Details
                </h2>
                <p className="text-sm leading-normal">Product description...</p>
            </div>
        </div>
    );
}
