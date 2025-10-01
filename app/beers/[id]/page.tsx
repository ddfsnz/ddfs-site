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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
        <>
            <Breadcrumb className="mb-6">
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
                <div className="grid h-min gap-3 md:mt-3 lg:mt-6 lg:pr-3">
                    <h1 className="font-display text-3xl font-bold">
                        {beer.name}
                    </h1>
                    <span className="text-gray-500">{beer.company.name}</span>
                    <BeerBadges beerOptions={beer.beerOptions} />
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select size..." />
                        </SelectTrigger>
                        <SelectContent>
                            {beer.beerOptions.quantity.map((o) => (
                                <SelectItem key={o} value={String(o)}>
                                    {o} Pack
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2">
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
        </>
    );
}
