"use client";

import "swiper/css";
import { useState } from "react";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { ProductImage } from "@/components/products/ProductImage";
import { Product } from "@/types/product";

export function ProductImages({ product }: { product: Product }) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

    return (
        <div className="relative">
            <Swiper thumbs={{ swiper: thumbsSwiper }} modules={[Thumbs]} loop>
                {product.images?.map((i, index) => (
                    <SwiperSlide key={i.asset._id}>
                        <ProductImage
                            image={i}
                            name={`${product.name} image ${index}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2">
                <Swiper onSwiper={setThumbsSwiper}>
                    {product.images?.map((i, index) => (
                        <SwiperSlide
                            key={i.asset._id}
                            className="mx-0.5 size-10! cursor-pointer transition-opacity [&:not(.swiper-slide-thumb-active)]:opacity-50"
                        >
                            <ProductImage
                                image={i}
                                name={`${product.name} image ${index}`}
                                className="size-10 border"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
