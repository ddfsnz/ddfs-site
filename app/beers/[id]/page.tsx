import { Check, Home, Info, ShoppingCart } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { sanity } from "@/lib/sanity";
import { cn } from "@/lib/utils";
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
                <div className="grid h-min gap-6 md:pt-3 lg:pt-6 lg:pr-3 lg:pb-6">
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
                        <span className="font-display mt-auto text-2xl font-bold text-red-700">
                            <DisplayPrice price={beer.price} />{" "}
                            <span className="text-xs font-semibold">+GST</span>
                        </span>
                        <BeerBadges beerOptions={beer.beerOptions} />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {beer.beerOptions.quantity.map((o, i) => (
                            <Button key={o} variant="outline">
                                <Check className={cn(i !== 0 && "opacity-0")} />
                                {o} Pack
                            </Button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 items-end gap-3">
                        <div className="grid gap-1">
                            <label className="flex justify-between text-xs text-gray-500">
                                <span>Quantity</span>
                                <span className="flex items-center gap-1 font-light text-gray-400">
                                    {beer.stock} in stock{" "}
                                    <Info className="size-3" />
                                </span>
                            </label>
                            <Input
                                type="number"
                                defaultValue={beer.quantity[0]}
                                min={1}
                                max={beer.quantity[beer.quantity.length - 1]}
                                className="text-center"
                            />
                        </div>
                        <Button>
                            Add to Cart <ShoppingCart />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mx-auto w-full max-w-3xl">
                <Separator className="mb-6" />
                <h2 className="font-display text-2xl font-bold">
                    Product Details
                </h2>
                <p className="text-sm leading-normal">Product description...</p>
            </div>
        </div>
    );
}
