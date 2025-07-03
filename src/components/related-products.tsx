import { ProductsCarousel } from "./products-carousel";

const filters = [
    { description: "celular", key: "phone" },
    { description: "acessórios", key: "accessories" },
    { description: "tablets", key: "tablets" },
    { description: "notebooks", key: "notebooks" },
    { description: "tvs", key: "tvs" },
    { description: "ver todos", key: "all" }
]

export function RelatedProducts({ showFilters = false }: { showFilters?: boolean }) {
    return (
        <section id="products-section" aria-label="products-section" className="max-w-7xl min-[1700px]:max-w-[1550px] mx-auto">
            <div className="max-sm:px-8 flex items-center justify-center gap-4">
                <div className="line" />
                <h2 className="text-xl sm:text-3xl font-semibold text-blue text-nowrap">Produtos relacionados</h2>
                <div className="line" />
            </div>

            {showFilters
                ? <div className="flex max-sm:w-screen w-full overflow-auto [&::-webkit-scrollbar]:[all:unset]">
                    <div className="flex justify-between w-full gap-2 border border-gray/30 my-6 [&_p+p]:border-l [&_p+p]:border-gray/30">
                        {filters.map(({ key, description }) => (
                            <p key={key} className="uppercase text-center w-full h-full p-2 text-nowrap">{description}</p>
                        ))}
                    </div>
                </div>

                : <div className="text-center py-2 font-semibold text-md">
                    <a href="#">Ver todos</a>
                </div>
            }
            <ProductsCarousel />
        </section>
    )
}