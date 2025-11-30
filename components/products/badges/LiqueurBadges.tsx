import { Badge } from "@/components/_ui/badge";
import { Liqueur } from "@/types/product";

export function LiqueurBadges({
    liquerOptions,
}: {
    liquerOptions: Liqueur["liquerOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className="border-green-200 bg-white text-green-500"
            >
                {liquerOptions.style.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {liquerOptions.abv}% ABV
            </Badge>
            {liquerOptions.isTravelExclusive && (
                <Badge variant="outline" className="text-gray-500">
                    Travel Exclusive
                </Badge>
            )}
        </div>
    );
}
