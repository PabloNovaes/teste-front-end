import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/price-formater";
import type { HTMLAttributes } from "react";

interface Props extends Product, Omit<HTMLAttributes<HTMLDivElement>, "id"> { }

export function ProductCard({ image, currentPrice, freeShipping, installments, prevPrice, name, style, ...props }: Props) {
    return (
        <div aria-label="product-card" {...props} style={style}
            className="bg-white shrink-0 w-full h-[500px] p-6 shadow-md rounded-2xl flex flex-col overflow-hidden transition-shadow duration-300 border border-border"
        >
            <div className="flex-1">
                <div className="flex justify-center mb-4">
                    <div className="relative">
                        <img src={image || "/placeholder.svg"} alt="iPhone" className="object-contain max-h-[240.52px]" />
                    </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{name}</p>

                <div className="mb-2">
                    <span className="text-gray-400 text-sm line-through mr-2">{formatPrice(prevPrice)}</span>
                    <span className="text-gray-900 text-xl font-bold tracking-tight">{formatPrice(currentPrice)}</span>
                </div>

                <p className="text-gray-600 text-xs mb-2">{`Até ${installments}x de ${formatPrice(currentPrice / installments)} `}</p>

                {freeShipping && <p className="text-blue text-sm font-medium mb-4">Frete grátis</p>}

            </div>
            <button className="text-sm w-full min-h-[44px] max-h-[44px] cursor-pointer bg-blue hover:brightness-75 text-white font-semibold rounded-xl transition-all duration-200">
                COMPRAR
            </button>
        </div>
    )
}