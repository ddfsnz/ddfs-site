"use server";

import { Resend } from "resend";
import { CartItem } from "@/components/cart/cart-context";
import { OrderRecipient } from "@/components/checkout/checkout-context";

const { RESEND_API_KEY } = process.env;
if (!RESEND_API_KEY) throw new Error("No Resend API key.");

export async function sendOrder(
    cartItems: CartItem[],
    cartPrice: number,
    recipient: OrderRecipient,
) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    function recipientTemplate() {
        return `
            <div style="font-family: Arial, sans-serif; background: #fafafa; padding: 32px;">
                <img src="https://www.ddfs.co.nz/logo-red-horizontal.png" alt="Diplomatic Duty Free Services" />
                <h1 style="color: #b91c1c; font-size: 2rem; margin-bottom: 0.5em;">Your DDFS Order</h1>
                <p>Hi ${recipient.name}, thank you for your order. Here are your order details:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;">
                    <thead>
                        <tr style="background: #f3f4f6;">
                            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: left;">Item</th>
                            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">Quantity</th>
                            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">Unit Price</th>
                            <th style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cartItems
                            .map(
                                (item) => `
                            <tr>
                                <td style="padding: 8px; border: 1px solid #e5e7eb;">${item.product.name}</td>
                                <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">${item.quantity}</td>
                                <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">$${(item.product.price * 1.15).toFixed(2)} <span style="font-size: 0.8em;">incl.&nbsp;GST</span></td>
                                <td style="padding: 8px; border: 1px solid #e5e7eb; text-align: right;">$${(item.product.price * 1.15 * item.quantity).toFixed(2)} <span style="font-size: 0.8em;">incl.&nbsp;GST</span></td>
                            </tr>
                        `,
                            )
                            .join("")}
                    </tbody>
                </table>
                <p style="font-size: 1.2rem; margin-top: 1.5em;">
                    <strong>Order Total: <span style="color: #b91c1c;">$${(cartPrice * 1.15).toFixed(2)}</span> <span style="font-size: 0.8em;">(incl. GST)</span></strong>
                </p>
                <p>
                    <strong>Your details:</strong
                    <br />
                    <span>${recipient.name}</span>
                    <br />
                    <span>${recipient.email}</span>
                    <br />
                    <span>${recipient.phone}</span>
                    <br />
                    <span>${recipient.embassy}</span>
                </p>
                <p>Jordan from DDFS will be in touch to organise your Diplomatic Privileges Purchasing Letter (MFA606) and confirm delivery times for your order.</p>
                <p>If you have any questions, please email Jordan at <a href="mailto:jordan@ddfs.co.nz" style="color: #b91c1c;">jordan@ddfs.co.nz</a> or call on <a href="tel:+64279092117" style="color: #b91c1c;">+64 27 909 2117</a>.</p>
                <p>Thank you.</p>
            </div>
        `;
    }

    const { data } = await resend.emails.send({
        from: "DDFS NZ <orders@orders.ddfs.co.nz>",
        replyTo: "jordan@ddfs.co.nz",
        to: [recipient.email],
        subject: "Your DDFS Order",
        html: recipientTemplate(),
    });

    console.log(data);
}
