import { CatalogHeader } from "@/components/CatalogHeader";
import { BEERS_CATEGORY_ID, sanity } from "@/lib/sanity";
import { Beer } from "@/types/product";

export default async function Page() {
    const beers = await sanity.fetch<Beer[]>(
        `*[_type == "product" && category._ref == "${BEERS_CATEGORY_ID}"]`,
    );
    console.log(beers);

    return <CatalogHeader heading="Beers" />;
}
