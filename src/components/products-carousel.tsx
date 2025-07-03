import { useProducts } from "@/hooks/use-products"
import type { Product } from "@/types/product"
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { ProductCard } from "./product-card"
import { ProductModal } from "./product-modal"
import { Button } from "./ui/button"


export function ProductsCarousel() {
    const { products, loading, error } = useProducts()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlay] = useState(true)
    const [itemsPerView, setItemsPerView] = useState(4)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)
    const [isUserInteracting, setIsUserInteracting] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<null | Product>(null)

    const carouselRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth

            switch (true) {
                case width < 640:
                    return setItemsPerView(1)
                case width < 768:
                    return setItemsPerView(1)
                case width < 1024:
                    return setItemsPerView(3)
                case width < 1280:
                    return setItemsPerView(4)
                case width < 1700:
                    return setItemsPerView(5)
                default:
                    return setItemsPerView(6)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])



    const maxIndex = Math.max(0, (products?.length || 0) - itemsPerView)


    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(0)
        }
    }, [currentIndex, maxIndex])

    const nextSlide = useCallback(() => {
        if (!products?.length) return
        setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1))
    }, [maxIndex, products?.length])

    const prevSlide = useCallback(() => {
        if (!products?.length) return
        setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1))
    }, [maxIndex, products?.length])

    const goToSlide = useCallback(
        (index: number) => {
            if (index >= 0 && index <= maxIndex) {
                setCurrentIndex(index)
            }
        },
        [maxIndex],
    )


    useEffect(() => {
        if (!isAutoPlay || isUserInteracting || !products?.length) return

        const interval = setInterval(() => {
            nextSlide()
        }, 3000)

        return () => clearInterval(interval)
    }, [isAutoPlay, nextSlide, isUserInteracting, products?.length])


    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
        setIsUserInteracting(true)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return

        const distance = touchStart - touchEnd
        const isLeftSwipe = distance > 50
        const isRightSwipe = distance < -50

        if (isLeftSwipe) {
            nextSlide()
        } else if (isRightSwipe) {
            prevSlide()
        }


        setTouchStart(0)
        setTouchEnd(0)


        setTimeout(() => setIsUserInteracting(false), 2000)
    }


    if (loading) {
        return (
            <div className="grid gap-4 mx-auto max-xl:px-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-2 text-gray-600">Carregando produtos...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="grid gap-4 mx-auto max-xl:px-8">
                <div className="flex justify-center items-center h-64 text-red-600">
                    <span>Erro ao carregar produtos: {error.message}</span>
                </div>
            </div>
        )
    }


    if (!products?.length) {
        return (
            <div className="grid gap-4 mx-auto max-xl:px-8">
                <div className="flex justify-center items-center h-64 text-gray-500">
                    <span>Nenhum produto encontrado</span>
                </div>
            </div>
        )
    }

    const shouldShowNavigation = products.length > itemsPerView

    return (
        <div aria-label="products-carousel" className="grid gap-4 mx-auto max-xl:px-8" ref={carouselRef} tabIndex={0}>
            <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseEnter={() => setIsUserInteracting(true)}
                onMouseLeave={() => setIsUserInteracting(false)}
                className="overflow-hidden relative py-2"
            >
                {shouldShowNavigation && (
                    <Button
                        disabled={currentIndex === 0}
                        size="icon"
                        variant="outline"
                        onClick={() => {
                            prevSlide()
                            setIsUserInteracting(true)
                            setTimeout(() => setIsUserInteracting(false), 2000)
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white rounded-full w-12 h-12 transition-all duration-200 disabled:opacity-50"
                        aria-label="Produto anterior"
                    >
                        <CaretLeftIcon className="h-5 w-5" />
                    </Button>
                )}

                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
                    }}
                >
                    {products.map((product) => (
                        <div key={product.id} className="flex-shrink-0 px-2" style={{ width: `${100 / itemsPerView}%` }}>
                            <ProductCard onClick={() => {
                                setSelectedProduct(product)
                                setIsModalOpen(true)
                            }} key={product.id} {...product} className="h-full" />
                        </div>
                    ))}
                </div>

                {shouldShowNavigation && (
                    <Button
                        disabled={currentIndex === maxIndex}
                        size="icon"
                        variant="outline"
                        onClick={() => {
                            nextSlide()
                            setIsUserInteracting(true)
                            setTimeout(() => setIsUserInteracting(false), 2000)
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white rounded-full w-12 h-12 transition-all duration-200 disabled:opacity-50"
                        aria-label="Próximo produto"
                    >
                        <CaretRightIcon className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {shouldShowNavigation && maxIndex > 0 && (
                <div className="flex justify-center space-x-2">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                goToSlide(index)
                                setIsUserInteracting(true)
                                setTimeout(() => setIsUserInteracting(false), 2000)
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${currentIndex === index ? "bg-indigo-600 shadow-lg" : "bg-gray-300 hover:bg-gray-400"
                                }`}
                            aria-label={`Ir para slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct as Product} />

        </div>
    )
}
