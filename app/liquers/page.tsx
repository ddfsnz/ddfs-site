import { CatalogHeader } from "@/components/CatalogHeader";
import { LIQUERS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Liquer } from "@/types/product";

export default async function Page() {
    const liquers = await sanity.fetch<Liquer[]>(
        `*[_type == "product" && category._ref == "${LIQUERS_CATEGORY_ID}"]`,
    );
    console.log(liquers);

    return <CatalogHeader heading="Liquers" />;
}
