import { cn } from "@/utils/cn";
import { drinkIcon, fashionIcon, healthIcon, marketIcon, sportIcon, techIcon, toolsIcon } from "@/utils/custom-icons";
import { useState } from "react";

const content = [
    { description: "Tecnologia", key: "tech", icon: techIcon },
    { description: "Supermercado", key: "market", icon: marketIcon },
    { description: "Bebidas", key: "drinks", icon: drinkIcon },
    { description: "Ferramentas", key: "tools", icon: toolsIcon },
    { description: "Saúde", key: "health", icon: healthIcon },
    { description: "Esportes e Fitness", key: "sports", icon: sportIcon },
    { description: "Moda", key: "fashion", icon: fashionIcon }
];

export function CategoriesList() {
    const [selected, setSelected] = useState("tech")

    return (
        <nav aria-label="categories-list" className="flex-1 mt-6">
            <ul className="flex justify-center flex-wrap gap-6 max-xl:grid grid-cols-2 min-[540px]:grid-cols-4 lg:grid-cols-5 w-full p-8">
                {content.map(({ description, icon, key }) => (
                    <li
                        key={key}
                        onClick={() => setSelected(key)}
                        className={cn("flex flex-col items-center gap-2",
                            key === selected && "[&_div]:bg-white [&_div]:border-blue/20 [&_span]:text-blue"

                        )}>
                        <div className="size-32 grid place-content-center rounded-2xl bg-light-gray border border-transparent transition-all duration-200 cursor-pointer">
                            <img src={icon} alt="icon" className="w-16" />
                        </div>
                        <span>{description}</span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
