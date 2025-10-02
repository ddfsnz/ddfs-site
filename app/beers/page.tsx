import { Settings2 } from "lucide-react";
import { CatalogHeader } from "@/components/CatalogHeader";
import { FilterInput } from "@/components/FilterInput";
import { ProductGrid } from "@/components/ProductGrid";
import { SearchInput } from "@/components/SearchInput";
import { SortOrder } from "@/components/SortOrder";
import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { BEERS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Company, Style } from "@/types/metadata";
import { Beer } from "@/types/product";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        sort?: string;
        search?: string;
        company?: string;
        style?: string;
        size?: string;
        container?: string;
    };
}) {
    const filters = await searchParams;
    let searchFilter = filters.search
        ? `&& (name match "${filters.search}*" || company->name match "${filters.search}*")`
        : "";
    if (filters.company) {
        searchFilter += ` && company._ref == "${filters.company}"`;
    }
    if (filters.style) {
        searchFilter += ` && beerOptions.style._ref == "${filters.style}"`;
    }
    if (filters.size) {
        searchFilter += ` && beerOptions.size.value == ${filters.size}`;
    }
    if (filters.container) {
        searchFilter += ` && beerOptions.container == "${filters.container}"`;
    }

    const sortOrder = (await searchParams).sort || "name asc";

    const beers = await sanity.fetch<Beer[]>(
        `*[_type == "product" && category._ref == "${BEERS_CATEGORY_ID}" ${searchFilter}] | order(${sortOrder}) {
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
    );

    const companies = await sanity.fetch<Company[]>(
        `*[_type == "company" && category._ref == "${BEERS_CATEGORY_ID}"] | order(name asc)`,
    );

    const styles = await sanity.fetch<Style[]>(
        `*[_type == "tag" && type == "style" && category._ref == "${BEERS_CATEGORY_ID}"] | order(name asc)`,
    );

    const allBeerSizes = await sanity.fetch<Beer[]>(
        `*[_type == "product" && category._ref == "${BEERS_CATEGORY_ID}"] {
            beerOptions
        }`,
    );
    const sizes = Array.from(
        new Map(
            allBeerSizes.map((b) => [
                String(b.beerOptions.size.value),
                {
                    value: String(b.beerOptions.size.value),
                    label: b.beerOptions.size.value + b.beerOptions.size.unit,
                },
            ]),
        ).values(),
    );

    const containers = [
        { value: "Cans", label: "Cans" },
        { value: "Bottles", label: "Bottles" },
    ];

    return (
        <>
            <CatalogHeader heading="Beers" />
            <div className="grid grid-cols-1 md:grid-cols-[240px_auto]">
                <div className="hidden border-r p-3 pl-0 md:block">
                    <div className="sticky top-24 grid grid-cols-1 place-content-start gap-4">
                        <SearchInput
                            label="Search"
                            initialValue={filters.search}
                        />
                        <FilterInput
                            label="Producer"
                            filterName="company"
                            filterOptions={companies.map((c) => ({
                                value: c._id,
                                label: c.name,
                            }))}
                        />
                        <FilterInput
                            label="Style"
                            filterName="style"
                            filterOptions={styles.map((s) => ({
                                value: s._id,
                                label: s.name,
                            }))}
                        />
                        <FilterInput
                            label="Size"
                            filterName="size"
                            filterOptions={sizes}
                        />
                        <FilterInput
                            label="Container"
                            filterName="container"
                            filterOptions={containers}
                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center justify-between border-b bg-gray-50 p-1 md:pl-3">
                        <div className="flex items-center gap-3">
                            <Popover>
                                <PopoverTrigger
                                    className="block md:hidden"
                                    asChild
                                >
                                    <Button size="icon" variant="ghost">
                                        <Settings2 />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="sticky top-24 grid grid-cols-1 place-content-start gap-4">
                                        <SearchInput
                                            label="Search"
                                            initialValue={filters.search}
                                        />
                                        <FilterInput
                                            label="Producer"
                                            filterName="company"
                                            filterOptions={companies.map(
                                                (c) => ({
                                                    value: c._id,
                                                    label: c.name,
                                                }),
                                            )}
                                        />
                                        <FilterInput
                                            label="Style"
                                            filterName="style"
                                            filterOptions={styles.map((s) => ({
                                                value: s._id,
                                                label: s.name,
                                            }))}
                                        />
                                        <FilterInput
                                            label="Size"
                                            filterName="size"
                                            filterOptions={sizes}
                                        />
                                        <FilterInput
                                            label="Container"
                                            filterName="container"
                                            filterOptions={containers}
                                        />
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <span className="text-sm font-medium text-gray-500">
                                {beers.length} Products
                            </span>
                        </div>
                        <SortOrder />
                    </div>
                    <div className="py-2 md:p-2 md:pr-0 lg:p-3 lg:pr-0">
                        <ProductGrid products={beers} />
                    </div>
                </div>
            </div>
        </>
    );
}
