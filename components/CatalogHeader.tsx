export function CatalogHeader({ heading }: { heading: string }) {
    return (
        <div className="px-2 sm:px-3">
            <div className="mx-auto max-w-7xl border-b pt-24 pb-4 sm:pt-32">
                <h1 className="font-display text-5xl font-bold text-gray-800 sm:text-7xl">
                    {heading}
                </h1>
            </div>
        </div>
    );
}
