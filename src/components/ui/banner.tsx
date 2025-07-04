import { cn } from "@/utils/cn"
import type { HTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"

const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
} as const

type ContentType = {
    size?: keyof typeof sizeClasses
    content: string | ReactNode
    className?: string
}

type ActionType = {
    type: "link" | "function"
    href: string
    label: string
    variant?: "primary" | "secondary" | "outline"
    disabled?: boolean
}

interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    title: ContentType
    secondary?: boolean
    description?: ContentType
    image: {
        src: string
        alt: string
        loading?: "lazy" | "eager"
    }
    action?: ActionType
    height?: "sm" | "md" | "lg" | "xl"
    contentPosition?: "left" | "center" | "right" | "end" | "start"
}

const heightClasses = {
    sm: "h-[200px] lg:h-[280px]",
    md: "h-[280px] lg:h-[390px]",
    lg: "h-[350px] lg:h-[500px]",
    xl: "h-[400px] lg:h-[600px]",
}

const positionClasses = {
    left: "items-left",
    center: "items-center",
    right: "items-end",
    start: "justify-start",
    end: "justify-end",
}

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
    (
        {
            title,
            description,
            image,
            action,
            secondary = false,
            height = "md",
            contentPosition = "left",
            className,
            ...props
        },
        ref,
    ) => {

        return (
            <div
                ref={ref}
                className={cn(
                    heightClasses[height],
                    "flex w-full bg-center bg-cover relative items-center overflow-hidden",
                    className,
                )}
                style={{ backgroundImage: `url(${image.src})` }}
                role="banner"
                aria-label="banner"
                {...props}
            >
                <div className={cn("absolute inset-0 w-full h-full", `${!secondary ? "bg-gradient-to-l" : "bg-gradient-to-b"} to-black`)} aria-hidden="true" />

                <div
                    className={cn(
                        "relative w-full p-10 lg:px-20 h-full",
                        "flex flex-col gap-6 sm:gap-4 lg:gap-6 justify-center",
                        secondary && "lg:px-10",
                        positionClasses[contentPosition]
                    )}
                >
                    <div className="grid">
                        <h1
                            className={cn(
                                "text-white font-bold leading-2",
                                "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl",
                                title.size && sizeClasses[title.size],
                                title.className,
                            )}
                        >
                            {title.content}
                        </h1>
                        {description && (
                            <p
                                className={cn(
                                    "text-white/90",
                                    "text-lg sm:text-xl lg:text-2xl",
                                    description.size && sizeClasses[description.size],
                                    description.className,
                                )}
                            >
                                {description.content}
                            </p>
                        )}
                    </div>

                    <a href={action?.href} className={cn("bg-primary p-3 px-8 rounded-lg w-fit")}>{action?.label}</a>
                </div>

                <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="sr-only"
                    loading={image.loading || "lazy"}
                />
            </div>
        )
    },
)

Banner.displayName = "Banner"
