import type React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/utils/cn"
import { boxIcon, heartIcon, shoppingCartIcon, userCircleIcon } from "@/utils/custom-icons"
import { Heart, PackageIcon, ShoppingCartIcon, UserCircleIcon } from "@phosphor-icons/react"
import {
    motion,
    stagger,
    useAnimate
} from "framer-motion"
import { memo, useEffect, useState } from "react"
import { categories } from "./headers"


interface NavMenuProps {
    className?: string
    mobileBreakpoint?: number
}

function useMenuAnimation(isMenuOpen: boolean, isMobile: boolean) {
    const [scope, animate] = useAnimate()
    const staggerMenuItems = stagger(0.1, { startDelay: 0.15 })

    useEffect(() => {
        if (!isMobile) return
        animate(
            "div#mobile-menu",
            isMenuOpen ? { height: "100dvh", zIndex: 10 } : { height: 0 },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5,
                delay: isMenuOpen ? 0 : 1
            },
        )
        animate(
            "span.motion-item, li.motion-item, div.motion-item",
            isMenuOpen ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(10px)", y: 50 },
            {
                duration: 0.6,
                delay: staggerMenuItems,
                type: "spring",
                bounce: 0,
            },
        )
    }, [isMenuOpen, animate, staggerMenuItems, isMobile])

    return scope
}

const MobileMenu = memo(
    ({
        isMenuOpen,
        setIsMenuOpen,
        scope,
    }: {
        isMenuOpen: boolean
        setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
        scope: React.RefObject<HTMLElement>
    }) => {
        const show = useMediaQuery("(max-width: 890px)")
        const navItems = [
            { description: "Carrinho de compras", href: "#", icon: ShoppingCartIcon },
            { description: "Favoritos", href: "#", icon: Heart },
            { description: "Pedidos", href: "#", icon: PackageIcon }
        ]


        return (
            <>
                {show &&
                    <div>
                        <div className="flex items-center w-full max-w-5xl m-auto justify-end">
                            <button
                                className={cn(
                                    "z-20 p-4 pr-0 focus:outline-none flex flex-col justify-center items-center transition-all duration-300 border-ring/20",
                                )}
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                aria-description={isMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMenuOpen}
                            >
                                <motion.span
                                    className="block rounded-xl opacity-80 h-[1px] w-[18px] bg-black"
                                    style={{ y: "-3px" }}
                                    animate={{
                                        y: isMenuOpen ? 0 : -3,
                                        rotate: isMenuOpen ? 45 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: "backInOut" }}
                                />
                                <motion.span
                                    className="block rounded-xl opacity-80 h-[1.1px] w-[18px] bg-black"
                                    style={{ y: "3px" }}
                                    animate={{
                                        y: isMenuOpen ? -1 : 3,
                                        rotate: isMenuOpen ? -45 : 0,
                                    }}
                                    transition={{ duration: 0.3, ease: "backInOut" }}
                                />
                            </button>
                        </div>
                        <div className="w-full absolute left-0 top-[80px] min-[890px]:hidden">
                            <header className="flex relative h-[60px] items-center border-ring/10 transition-all duration-200 pr-2 pt-2" ref={scope}>
                                <motion.div
                                    id="mobile-menu"
                                    className="menu w-full bg-background absolute left-0 top-0 h-0 overflow-hidden"
                                    aria-hidden={!isMenuOpen}
                                >
                                    <div className="relative h-full bg-white">
                                        <nav
                                            className="flex-col h-full pb-4 flex px-4 h-nav gap-2.5 text-lg relative min-[890px]:overflow-hidden"
                                        >
                                            <div className="motion-item rounded-2xl border border-gray/30 p-3 mb-3 flex items-center gap-2">
                                                <UserCircleIcon size={40} weight="duotone" className="text-[#222222]/80" />
                                                <div className="text-[#222222]/80 grid [&_p]:leading-5">
                                                    <p className="text-lg font-medium">Bem-vindo</p>
                                                    <p className="text-[14px] font-normal">Entre já para</p>
                                                </div>
                                            </div>
                                            {navItems.map(({ href, description, ...rest }, index) => (
                                                <motion.span
                                                    key={`mobile-${href}-${index}`}
                                                    className="motion-item pl-2 text-[#222222]/80 opacity-0 font-normal cursor-pointer flex items-center gap-4"
                                                    onClick={() => {
                                                        setIsMenuOpen(false)
                                                        setTimeout(() =>
                                                            document.querySelector(`section${href}`)?.scrollIntoView({ behavior: "smooth" }), 1300
                                                        )
                                                    }}
                                                >
                                                    {rest.icon && <rest.icon weight="duotone" size={26} />}
                                                    {description}
                                                </motion.span>
                                            ))}
                                            <div className="w-full motion-item h-px bg-gray/30 my-4"></div>
                                            {categories.map(({ href, description, ...rest }, index) => (
                                                <motion.span
                                                    key={`mobile-${href}-${index}`}
                                                    className="motion-item pl-2 text-[#222222]/80 opacity-0 font-normal cursor-pointer flex items-center gap-4"
                                                    onClick={() => {
                                                        setIsMenuOpen(false)
                                                        setTimeout(() =>
                                                            document.querySelector(`section${href}`)?.scrollIntoView({ behavior: "smooth" }), 1300
                                                        )
                                                    }}
                                                >
                                                    {rest.icon && <rest.icon weight="duotone" size={26} />}
                                                    {description}
                                                </motion.span>
                                            ))}
                                        </nav>
                                    </div>
                                </motion.div>
                            </header>
                        </div>
                    </div>
                }
            </>

        )
    },
)

MobileMenu.displayName = "MobileMenu"

const DesktopMenu = memo(() => {
    const show = useMediaQuery("(min-width: 890px)")
    return (
        <>
            {show && <ul className="flex items-center gap-4 [&_li]:cursor-pointer [&_li_img]:max-w-16">
                <li>
                    <img src={boxIcon} alt="pedidos" />
                </li>
                <li>
                    <img src={heartIcon} alt="favoritos" />
                </li>
                <li>
                    <img src={userCircleIcon} alt="perfil" />
                </li>
                <li>
                    <img src={shoppingCartIcon} alt="carrinho" />
                </li>
            </ul>}
        </>
    )
},
)

DesktopMenu.displayName = "DesktopMenu"

export function NavMenu({ mobileBreakpoint = 500 }: NavMenuProps) {
    const isMobile = useMediaQuery(`(max-width: ${mobileBreakpoint}px)`)

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const scope = useMenuAnimation(isMenuOpen, isMobile)

    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add("overflow-hidden")
        } else {
            document.body.classList.remove("overflow-hidden")
        }

        return () => {
            document.body.classList.remove("overflow-hidden")
        }
    }, [isMenuOpen])

    return (
        <>
            <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scope={scope} />
            <DesktopMenu />
        </>
    )

}