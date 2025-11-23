import { ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/_ui/breadcrumb";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";
import { ProductDescription } from "@/components/products/ProductDescription";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductImage } from "@/components/products/ProductImage";
import { TobaccoBadges } from "@/components/TobaccoBadges";
import { TobaccoOptions } from "@/components/TobaccoOptions";
import { sanity, TOBACCO_CATEGORY_ID } from "@/lib/sanity";
import { Tobacco } from "@/types/product";

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
    const tobacco = await sanity.fetch<Tobacco | undefined>(
        `*[_type == "product" && _id == $id][0]{
            ...,
            company->{
                ...,
                name
            },
            tobaccoOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
        { id: id },
    );

    if (!tobacco) {
        notFound();
    }

    const companyId = tobacco.company._id;
    const related = await sanity.fetch<Tobacco[]>(
        `*[_type == "product" && category._ref == "${TOBACCO_CATEGORY_ID}" && company._ref == "${companyId}" && _id != "${tobacco._id}"][0...4] {
            ...,
            company->{
                ...,
                name
            },
            tobaccoOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
    );

    return (
        <main className="mx-auto max-w-7xl px-4 py-32 pt-24">
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
                            <BreadcrumbLink href="/tobacco">
                                Tobacco
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-2 lg:gap-6">
                    <div className="overflow-hidden rounded-lg border">
                        <ProductImage product={tobacco} />
                    </div>
                    <div className="grid h-min gap-6 md:pt-3 lg:pt-6 lg:pr-3 lg:pb-6">
                        <ProductDetails product={tobacco}>
                            <TobaccoBadges
                                tobaccoOptions={tobacco.tobaccoOptions}
                            />
                        </ProductDetails>
                        <TobaccoOptions tobacco={tobacco} />
                    </div>
                </div>
                <div className="mx-auto my-12 w-full max-w-3xl">
                    <h2 className="font-display mb-2 text-2xl font-bold">
                        {tobacco.name}
                    </h2>
                    <ProductDescription description={tobacco.description} />
                </div>
                <div className="mx-auto my-12 w-full max-w-5xl">
                    <div className="flex items-baseline justify-between gap-3">
                        <h2 className="font-display mb-6 text-2xl font-bold">
                            More from {tobacco.company.name}
                        </h2>
                        <Link
                            href={`/tobacco?company=${companyId}`}
                            className="flex items-center gap-1 transition-colors hover:text-red-700"
                        >
                            See All <ArrowRight className="size-4" />
                        </Link>
                    </div>
                    <CatalogGrid products={related} threeCols={false} />
                </div>
            </div>
        </main>
    );
}
