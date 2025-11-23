"use client";

import { Switch } from "@/components/_ui/switch";
import { usePriceContext } from "@/components/price/price-context";

export function GSTSwitch() {
    const { includeGST, toggleIncludeGST } = usePriceContext();

    return (
        <div className="flex items-center gap-2">
            <Switch
                onClick={toggleIncludeGST}
                checked={includeGST}
                id="gst-toggle"
            />
            <label
                htmlFor="gst-toggle"
                className="text-xs leading-none font-semibold"
            >
                Prices include GST
            </label>
        </div>
    );
}
