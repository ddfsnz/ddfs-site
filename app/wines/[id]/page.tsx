import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDescription } from "@/components/ProductDescription";
import { ProductDetails } from "@/components/ProductDetails";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductImage } from "@/components/ProductImage";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { WineBadges } from "@/components/WineBadges";
import { WineOptions } from "@/components/WineOptions";
import { sanity, WINES_CATEGORY_ID } from "@/lib/sanity";
import { Wine } from "@/types/product";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const wine = await sanity.fetch<Wine | undefined>(
        `*[_type == "product" && _id == $id][0]{
            ...,
            company->{
                ...,
                name
            },
            wineOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
        { id: id },
    );

    if (!wine) {
        notFound();
    }

    const companyId = wine.company._id;
    const related = await sanity.fetch<Wine[]>(
        `*[_type == "product" && category._ref == "${WINES_CATEGORY_ID}" && company._ref == "${companyId}" && _id != "${wine._id}"][0...4] {
            ...,
            company->{
                ...,
                name
            },
            wineOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
    );

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
                        <BreadcrumbLink href="/wines">Wines</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2 lg:gap-6">
                <div className="overflow-hidden rounded-lg border">
                    <ProductImage product={wine} />
                </div>
                <div className="grid h-min gap-6 md:pt-3 lg:pt-6 lg:pr-3 lg:pb-6">
                    <ProductDetails product={wine}>
                        <WineBadges wineOptions={wine.wineOptions} />
                    </ProductDetails>
                    <WineOptions wine={wine} />
                </div>
            </div>
            <div className="mx-auto my-12 w-full max-w-3xl">
                <h2 className="font-display mb-2 text-2xl font-bold">
                    {wine.name}
                </h2>
                <ProductDescription description={wine.description} />
            </div>
            <div className="mx-auto my-12 w-full max-w-5xl">
                <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-display mb-6 text-2xl font-bold">
                        More from {wine.company.name}
                    </h2>
                    <Link
                        href={`/wines?company=${companyId}`}
                        className="flex items-center gap-1 transition-colors hover:text-red-700"
                    >
                        See All <ArrowRight className="size-4" />
                    </Link>
                </div>
                <ProductGrid products={related} threeCols={false} />
            </div>
        </div>
    );
}
