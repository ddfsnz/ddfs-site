import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { FilterInput } from "@/components/catalog/FilterInput";
import { ProductCatalog } from "@/components/ProductCatalog";
import { LIQUERS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Company, Style } from "@/types/metadata";
import { Liquer } from "@/types/product";

export default async function Page({
    searchParams,
}: {
    searchParams: {
        sort?: string;
        search?: string;
        company?: string;
        style?: string;
        size?: string;
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
        searchFilter += ` && liquerOptions.style._ref == "${filters.style}"`;
    }
    if (filters.size) {
        searchFilter += ` && liquerOptions.size.value == ${filters.size}`;
    }

    const sortOrder = filters.sort || "name asc";

    const liquers = await sanity.fetch<Liquer[]>(
        `*[_type == "product" && category._ref == "${LIQUERS_CATEGORY_ID}" ${searchFilter}] | order(${sortOrder}) {
            ...,
            company->{
                ...,
                name
            },
            liquerOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
    );

    const companies = await sanity.fetch<Company[]>(
        `*[_type == "company" && category._ref == "${LIQUERS_CATEGORY_ID}"] | order(name asc)`,
    );

    const styles = await sanity.fetch<Style[]>(
        `*[_type == "tag" && type == "style" && category._ref == "${LIQUERS_CATEGORY_ID}"] | order(name asc)`,
    );

    const allLiquerSizes = await sanity.fetch<Liquer[]>(
        `*[_type == "product" && category._ref == "${LIQUERS_CATEGORY_ID}"] {
            liquerOptions
        }`,
    );
    const sizes = Array.from(
        new Map(
            allLiquerSizes.map((l) => [
                String(l.liquerOptions.size.value),
                {
                    value: String(l.liquerOptions.size.value),
                    label:
                        l.liquerOptions.size.value + l.liquerOptions.size.unit,
                },
            ]),
        ).values(),
    );

    return (
        <main className="relative">
            <div className="absolute inset-0 aspect-[2/1] bg-[url('/hero-liqueurs.png')] bg-contain bg-no-repeat"></div>
            <div className="absolute inset-0 aspect-[2/1] bg-gradient-to-b from-white/90 to-white"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 pt-40">
                <CatalogHeader
                    heading="Liquers"
                    subheading="Indulge in smooth, flavorful liqueurs ideal for sipping or mixing in cocktails."
                />
                <ProductCatalog products={liquers} search={filters.search}>
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
                        label="Size"
                        filterName="size"
                        filterOptions={sizes}
                        defaultValue={filters.size}
                    />
                </ProductCatalog>
            </div>
        </main>
    );
}
