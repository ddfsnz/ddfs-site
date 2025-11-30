"use client";

import "swiper/css";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductImage } from "@/components/products/ProductImage";
import { Product } from "@/types/product";

export function ProductImages({ product }: { product: Product }) {
    return (
        <Swiper modules={[Scrollbar]}>
            {product.images.map((i, index) => (
                <SwiperSlide key={i.asset._id}>
                    <ProductImage
                        image={i}
                        name={`${product.name} image ${index}`}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
