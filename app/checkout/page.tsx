import { CartItems } from "@/components/cart/CartItems";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export default async function Page() {
    return (
        <main className="mx-auto max-w-7xl px-4 py-32 pt-40">
            <div className="grid grid-cols-1 gap-3">
                <h1 className="font-display mb-3 text-5xl font-bold text-red-700 sm:text-7xl">
                    Checkout
                </h1>
                <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
                    <div>
                        <h2 className="mb-4 font-semibold text-red-700">
                            My Cart
                        </h2>
                        <CartItems />
                    </div>
                    <div className="lg:w-sm lg:border-l lg:pl-6">
                        <h2 className="mb-4 font-semibold text-red-700">
                            Enter your details to checkout
                        </h2>
                        <CheckoutForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
