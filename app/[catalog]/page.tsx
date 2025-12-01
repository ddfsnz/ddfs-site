import { notFound } from "next/navigation";
import { CATALOG_CONFIG, CatalogSlug } from "@/app/[catalog]/config";
import { Catalog } from "@/components/catalog/Catalog";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { FilterInput } from "@/components/catalog/FilterInput";
import { sanity } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { Company, Style } from "@/types/metadata";
import { Product } from "@/types/product";

export default async function Page({
    params,
    searchParams,
}: {
    params: { catalog: CatalogSlug };
    searchParams: {
        sort?: string;
        search?: string;
        company?: string;
        style?: string;
        size?: string;
        container?: string;
    };
}) {
    const { catalog } = await params;
    const config = CATALOG_CONFIG[catalog];

    if (!config) {
        notFound();
    }

    const filters = await searchParams;
    let searchFilter = filters.search
        ? `&& (name match "${filters.search}*" || company->name match "${filters.search}*")`
        : "";
    if (filters.company) {
        searchFilter += ` && company._ref == "${filters.company}"`;
    }
    if (filters.style) {
        searchFilter += ` && ${config.optionsKey}.style._ref == "${filters.style}"`;
    }
    if (config.filters.includes("size") && filters.size) {
        searchFilter += ` && ${config.optionsKey}.size.value == ${filters.size}`;
    }
    if (config.filters.includes("container") && filters.container) {
        searchFilter += ` && ${config.optionsKey}.container == "${filters.container}"`;
    }

    const sortOrder = filters.sort || "name asc";

    const products = await sanity.fetch<Product[]>(
        `*[_type == "product" && category._ref == "${config.id}" ${searchFilter}] | order(${sortOrder}) {
            ...,
            company->{
                ...,
                name
            },
            ${config.optionsKey} {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
    );

    const companies = await sanity.fetch<Company[]>(
        `*[_type == "company" && category._ref == "${config.id}"] | order(name asc)`,
    );

    const styles = await sanity.fetch<Style[]>(
        `*[_type == "tag" && type == "style" && category._ref == "${config.id}"] | order(name asc)`,
    );

    let sizes: { value: string; label: string }[] = [];
    if (config.filters.includes("size")) {
        const allSizes = await sanity.fetch<
            {
                [config.optionsKey]: { size: { unit: string; value: number } };
            }[]
        >(
            `*[_type == "product" && category._ref == "${config.id}"] {
                ${config.optionsKey}
            }`,
        );
        sizes = Array.from(
            new Map(
                allSizes.map((p) => [
                    String(p[config.optionsKey].size.value),
                    {
                        value: String(p[config.optionsKey].size.value),
                        label:
                            p[config.optionsKey].size.value +
                            p[config.optionsKey].size.unit,
                    },
                ]),
            ).values(),
        );
    }

    const containers = [
        { value: "Cans", label: "Cans" },
        { value: "Bottles", label: "Bottles" },
    ];

    return (
        <main className="relative">
            <div
                className={cn(
                    "absolute inset-0 aspect-[2/1] bg-contain bg-no-repeat",
                )}
                style={{ backgroundImage: `url(${config.hero})` }}
            ></div>
            <div className="absolute inset-0 aspect-[2/1] bg-gradient-to-b from-white/90 to-white"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 pt-40">
                <CatalogHeader
                    heading={config.heading}
                    subheading={config.subheading}
                />
                <Catalog products={products} search={filters.search}>
                    <FilterInput
                        label="Producer"
                        filterName="company"
                        filterOptions={companies.map((c) => ({
                            value: c._id,
                            label: c.name,
                        }))}
                        defaultValue={filters.company}
                    />
                    <FilterInput
                        label="Style"
                        filterName="style"
                        filterOptions={styles.map((s) => ({
                            value: s._id,
                            label: s.name,
                        }))}
                        defaultValue={filters.style}
                    />
                    {config.filters.includes("size") && (
                        <FilterInput
                            label="Size"
                            filterName="size"
                            filterOptions={sizes}
                            defaultValue={filters.size}
                        />
                    )}
                    {config.filters.includes("container") && (
                        <FilterInput
                            label="Container"
                            filterName="container"
                            filterOptions={containers}
                            defaultValue={filters.container}
                        />
                    )}
                </Catalog>
            </div>
        </main>
    );
}
