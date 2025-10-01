import { Badge } from "@/components/ui/badge";
import { Beer } from "@/types/product";

export function BeerBadges({
    beerOptions,
}: {
    beerOptions: Beer["beerOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-amber-200 bg-white text-amber-500"
            >
                {beerOptions.style.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {beerOptions.size.value}
                {beerOptions.size.unit} {beerOptions.container}
            </Badge>
            {beerOptions.abv && (
                <Badge variant="outline" className="text-gray-500">
                    {beerOptions.abv}% ABV
                </Badge>
            )}
        </div>
    );
}
