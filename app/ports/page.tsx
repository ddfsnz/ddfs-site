import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { FilterInput } from "@/components/FilterInput";
import { ProductCatalog } from "@/components/ProductCatalog";
import { PORTS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Company, Style } from "@/types/metadata";
import { Port } from "@/types/product";

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
        searchFilter += ` && portOptions.style._ref == "${filters.style}"`;
    }
    if (filters.size) {
        searchFilter += ` && portOptions.size.value == ${filters.size}`;
    }

    const sortOrder = filters.sort || "name asc";

    const ports = await sanity.fetch<Port[]>(
        `*[_type == "product" && category._ref == "${PORTS_CATEGORY_ID}" ${searchFilter}] | order(${sortOrder}) {
            ...,
            company->{
                ...,
                name
            },
            portOptions {
                ...,
                style->{
                    ...,
                    name
                }
            }
        }`,
    );

    const companies = await sanity.fetch<Company[]>(
        `*[_type == "company" && category._ref == "${PORTS_CATEGORY_ID}"] | order(name asc)`,
    );

    const styles = await sanity.fetch<Style[]>(
        `*[_type == "tag" && type == "style" && category._ref == "${PORTS_CATEGORY_ID}"] | order(name asc)`,
    );

    return (
        <main className="relative">
            <div className="absolute inset-0 aspect-[2/1] bg-[url('/hero-ports.png')] bg-contain bg-no-repeat"></div>
            <div className="absolute inset-0 aspect-[2/1] bg-gradient-to-b from-white/90 to-white"></div>
            <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 pt-40">
                <CatalogHeader
                    heading="Ports"
                    subheading="Savor rich, aged ports with deep flavors, perfect for after-dinner enjoyment."
                />
                <ProductCatalog products={ports} search={filters.search}>
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
                </ProductCatalog>
            </div>
        </main>
    );
}
