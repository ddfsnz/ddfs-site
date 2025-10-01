export function CatalogHeader({ heading }: { heading: string }) {
    return (
        <div className="border-b pt-24 pb-4 sm:pt-32">
            <h1 className="font-display text-5xl font-bold sm:text-7xl">
                {heading}
            </h1>
        </div>
    );
}
