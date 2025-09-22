import { CatalogHeader } from "@/components/CatalogHeader";
import { BEERS_CATEGORY_ID, sanity } from "@/lib/sanity";

export default async function Page() {
    const products = await sanity.fetch(
        `*[_type == "product" && category._ref == "${BEERS_CATEGORY_ID}"]`,
    );
    console.log(products);

    return <CatalogHeader heading="Beers" />;
}
