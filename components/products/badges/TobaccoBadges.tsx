import { Badge } from "@/components/_ui/badge";
import { Tobacco } from "@/types/product";

export function TobaccoBadges({
    tobaccoOptions,
}: {
    tobaccoOptions: Tobacco["tobaccoOptions"];
}) {
    return (
        <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="bg-white">
                {tobaccoOptions.style.name}
            </Badge>
        </div>
    );
}
