import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/utils/cn"
import {
    cardIcon,
    Logo,
    shieldIcon,
    truckIcon
} from "@/utils/custom-icons"
import { BooksIcon, CrownSimpleIcon, MagnifyingGlassIcon, SealPercentIcon, ShoppingCartIcon, SparkleIcon, SquaresFourIcon, TShirtIcon, type Icon } from "@phosphor-icons/react"
import { memo, useEffect, useState } from "react"
import { NavMenu } from "./nav-menu"

const HeaderSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const items = [
        {
            icon: shieldIcon,
            text: "Compra",
            highlight: "100% segura",
        },
        {
            icon: truckIcon,
            text: "Frete grátis",
            highlight: "acima de R$200",
        },
        {
            icon: cardIcon,
            text: "Parcele",
            highlight: "suas compras",
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [items.length])

    return (
        <div className="w-full h-10">
            <div className="hidden min-[950px]:flex justify-center gap-28 h-full text-gray-600">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <img src={item.icon} className="w-5" />
                        <p>
                            {item.text} <span className="text-blue-600">{item.highlight}</span>
                        </p>
                    </div>
                ))}
            </div>

            <div className="min-[950px]:hidden flex justify-center items-center h-full w-full text-gray-600 relative overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-in-out w-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {items.map((item, index) => (
                        <div key={index} className="flex items-center gap-1 min-w-full justify-center">
                            <img src={item.icon} className="w-4" />
                            <p className="text-xs">
                                {item.text} <span className="text-blue-600">{item.highlight}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const categories: { description: string, href: string, icon?: Icon, key: string }[] = [
    { description: "Todas as categorias", href: "#", icon: SquaresFourIcon, key: "all" },
    { description: "Supermercado", href: "#", icon: ShoppingCartIcon, key: "market" },
    { description: "Livros", href: "#", icon: BooksIcon, key: "books" },
    { description: "Moda", href: "#", icon: TShirtIcon, key: "fashion" },
    { description: "Lançamentos", href: "#", icon: SparkleIcon, key: "new" },
    { description: "Ofertas do dia", href: "#", icon: SealPercentIcon, key: "offers" },
    { description: "Assinatura", href: "#", icon: CrownSimpleIcon, key: "subscription" }
];

const CategorieSelector = () => {
    const [selected, setSelected] = useState("offers")
    const [desktop] = [useMediaQuery("(min-width: 768px)")]

    return (
        <ul className="flex items-center w-full gap-2 justify-between h-12 max-[1300px]:px-6">
            {categories.map((item) => {
                const { description, icon, key } = item
                return (
                    <li key={key}
                        onClick={() => setSelected(key)}
                        className={cn("uppercase cursor-pointer text-gray font-medium transition-colors duration-200",
                            icon && "flex gap-2 items-center",
                            key === selected && "text-blue"
                        )}>

                        {desktop && (key === "subscription" && item.icon && <item.icon weight="bold" size={20} />)}
                        {description}
                    </li>
                )
            }
            )}
        </ul>
    )
}

export function Header() {
    const QueryInput = memo(() => (
        <div className="flex items-center relative bg-light-gray rounded-xl p-1 h-fit w-full">
            <input placeholder="O que você está buscando?" type="text" className="focus-visible:outline-0 w-full text-md p-2" />
            <MagnifyingGlassIcon className="absolute right-3 text-gray" size={22} />
        </div>
    ))

    const mobile = useMediaQuery("(max-width: 768px)")

    return (
        <header aria-label="header" className="grid max-w-7xl min-[1700px]:max-w-[1550px] mx-auto">
            {!mobile && <HeaderSlider />}
            <div className="py-6 flex justify-between gap-30 max-[1300px]:px-6">
                <img src={Logo} className="w-full max-w-[100px] min-w-[500px]:max-w-[160px]" alt="logo" />
                {!mobile && <QueryInput />}
                <NavMenu />
            </div>
            {mobile && (
                <div className="p-6 pt-0 border-b border-border">
                    <QueryInput />
                </div>
            )}
            {mobile && <HeaderSlider />}
            {!mobile && <CategorieSelector />}
        </header>
    )
}