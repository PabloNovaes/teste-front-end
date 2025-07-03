
import type { Product } from "@/types/product"
import { Minus, Plus, X } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "motion/react"
import type React from "react"

import { useEffect, useState } from "react"

interface ProductModalProps {
    isOpen: boolean
    onClose: () => void
    product: Product
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", handleEscape)
            document.body.style.overflow = "hidden"
        }

        return () => {
            document.removeEventListener("keydown", handleEscape)
            document.body.style.overflow = "unset"
        }
    }, [isOpen, onClose])

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const incrementQuantity = () => {
        setQuantity((prev) => prev + 1)
    }

    const decrementQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1))
    }

    const handleBuy = () => {
        console.log(product);

        alert(`Comprando ${quantity} unidade(s) do produto: ${product?.name}`)
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(price)
    }

    return (
        <AnimatePresence>
            {isOpen &&
                <motion.div
                    aria-label="product-details-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    onClick={handleOverlayClick}

                >
                    <motion.div
                        initial={{ y: 20, scale: .9 }}
                        animate={{
                            y: 0, scale: 1,
                        }}
                        exit={{ y: 20, scale: .9 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 24,
                            duration: .1
                        }}
                        className="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[80vh] overflow-auto sm:overflow-hidden"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Fechar modal"
                        >
                            <X className="w-6 h-6 text-gray-600" />
                        </button>

                        <div className="grid sm:grid-cols-5">
                            <div className="sm:col-span-2 bg-gray-50 flex items-center justify-center p-8 lg:p-12">
                                <img
                                    src={product.image || "/placeholder.svg"}
                                    alt={product.name}
                                    className="object-contain w-[230px] sm:w-[300px]"
                                />
                            </div>

                            <div className="p-8 sm:col-span-3 lg:p-12 flex flex-col justify-center">
                                <div className="space-y-6">
                                    <h2 id="modal-title" className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                                        {product.name}
                                    </h2>

                                    <div className="text-3xl lg:text-4xl font-bold text-gray-900">{formatPrice(product.currentPrice)}</div>

                                    <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

                                    {product.detailsLink && (
                                        <a
                                            href={product.detailsLink ?? "/"}
                                            className="inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        >
                                            Veja mais detalhes do produto {">"}
                                        </a>
                                    )}

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <div className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden px-2">
                                            <button
                                                onClick={decrementQuantity}
                                                className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                disabled={quantity <= 1}
                                                aria-label="Diminuir quantidade"
                                            >
                                                <Minus className="w-5 h-5" />
                                            </button>
                                            <div className="px-6 py-3 text-xl font-semibold min-w-[80px] text-center">
                                                {quantity.toString().padStart(2, "0")}
                                            </div>
                                            <button
                                                onClick={incrementQuantity}
                                                className="p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                                                aria-label="Aumentar quantidade"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={handleBuy}
                                            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold cursor-pointer text-lg py-3 px-8 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                                        >
                                            COMPRAR
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    )
}
