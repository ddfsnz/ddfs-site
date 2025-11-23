import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { FilterInput } from "@/components/FilterInput";
import { ProductCatalog } from "@/components/ProductCatalog";
import { sanity, WINES_CATEGORY_ID } from "@/lib/sanity";
import { Company, Style } from "@/types/metadata";
import { Wine } from "@/types/product";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        sort?: string;
        search?: string;
        company?: string;
        style?: string;
        region?: string;
        year?: string;
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
        searchFilter += ` && wineOptions.style._ref == "${filters.style}"`;
    }
    if (filters.region) {
        searchFilter += ` && wineOptions.region == "${filters.region}"`;
    }
    if (filters.year) {
        searchFilter += ` && wineOptions.year == ${filters.year}`;
    }

    const sortOrder = filters.sort || "name asc";

    const wines = await sanity.fetch<Wine[]>(
        `*[_type == "product" && category._ref == "${WINES_CATEGORY_ID}" ${searchFilter}] | order(${sortOrder}) {
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

    const companies = await sanity.fetch<Company[]>(
        `*[_type == "company" && category._ref == "${WINES_CATEGORY_ID}"] | order(name asc)`,
    );

    const styles = await sanity.fetch<Style[]>(
        `*[_type == "tag" && type == "style" && category._ref == "${WINES_CATEGORY_ID}"] | order(name asc)`,
    );

    const allRegions = await sanity.fetch<string[]>(
        `*[_type == "product" && category._ref == "${WINES_CATEGORY_ID}"].wineOptions.region`,
    );
    const regions = [...new Set(allRegions.filter(Boolean).sort())];

    const allYears = await sanity.fetch<number[]>(
        `*[_type == "product" && category._ref == "${WINES_CATEGORY_ID}"].wineOptions.year`,
    );
    const years = [...new Set(allYears.filter(Boolean).sort())];

    return (
        <main className="relative">
            <div className="absolute inset-0 aspect-[2/1] bg-[url('/hero-wines.png')] bg-contain bg-no-repeat"></div>
            <div className="absolute inset-0 aspect-[2/1] bg-gradient-to-b from-white/90 to-white"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 pt-40">
                <CatalogHeader
                    heading="Wines"
                    subheading="Discover a curated selection of premium wines from New Zealand and around the world."
                />
                <ProductCatalog products={wines} search={filters.search}>
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
                    <FilterInput
                        label="Region"
                        filterName="region"
                        filterOptions={regions.map((r) => ({
                            value: r,
                            label: r,
                        }))}
                        defaultValue={filters.region}
                    />
                    <FilterInput
                        label="Year"
                        filterName="year"
                        filterOptions={years.map((y) => ({
                            value: y.toString(),
                            label: y.toString(),
                        }))}
                        defaultValue={filters.year}
                    />
                </ProductCatalog>
            </div>
        </main>
    );
}
