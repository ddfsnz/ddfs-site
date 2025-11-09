import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Wine } from "@/types/product";

export function WineBadges({
    wineOptions,
}: {
    wineOptions: Wine["wineOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge
                variant="outline"
                className={cn(
                    "bg-white",
                    wineOptions.wineType === "Red"
                        ? "border-rose-200 text-rose-800"
                        : "border-yellow-200 text-yellow-500",
                )}
            >
                {wineOptions.style.name}
            </Badge>
            <Badge variant="outline" className="text-gray-500">
                {wineOptions.region}
            </Badge>
            {wineOptions.year && (
                <Badge variant="outline" className="text-gray-500">
                    {wineOptions.year}
                </Badge>
            )}
            <Badge variant="outline" className="text-gray-500">
                {wineOptions.abv}% ABV
            </Badge>
        </div>
    );
}
