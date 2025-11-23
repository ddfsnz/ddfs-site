import { CartItem } from "@/components/cart/cart-context";

export function usePrice() {
    function calculatePrice(cartItem: CartItem) {
        let price = cartItem.product.price * cartItem.quantity;
        if (cartItem.packSize) {
            let basePackSize: number | null = null;
            if ("beerOptions" in cartItem.product) {
                basePackSize = cartItem.product.beerOptions.quantity[0];
            } else if ("ciderOptions" in cartItem.product) {
                basePackSize = cartItem.product.ciderOptions.quantity[0];
            }
            if (basePackSize && cartItem.packSize !== basePackSize) {
                price *= cartItem.packSize / basePackSize;
            }
        }
        return price;
    }

    return { calculatePrice };
}
