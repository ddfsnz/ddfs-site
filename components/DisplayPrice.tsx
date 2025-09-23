export function DisplayPrice({ price }: { price: number }) {
    return `$${price.toFixed(2)}`;
}
