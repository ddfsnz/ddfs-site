import { CatalogHeader } from "@/components/CatalogHeader";
import { PORTS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Port } from "@/types/product";

export default async function Page() {
    const ports = await sanity.fetch<Port[]>(
        `*[_type == "product" && category._ref == "${PORTS_CATEGORY_ID}"]`,
    );
    console.log(ports);

    return <CatalogHeader heading="Port" />;
}
