import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { Spinner } from "../Spinner/Spinner";

const button = tv({
    base: [
            "flex items-center justify-center gap-2 cursor-pointer",
            "ease-out duration-200 font-medium whitespace-nowrap", 
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#373737] focus-visible:ring-offset-2",
            "disabled:opacity-60 disabled:cursor-not-allowed",
            "transition-all"
        ],
    variants: {
        variant: {
            primary: "bg-[#373737] text-white hover:bg-[#373737]/80 active:bg-[#373737]/60 rounded-lg",
            secondary: "bg-[#1f1f1f] text-[#b3b3b3] hover:bg-[#1f1f1f]/90 hover:text-white active:bg-[#1f1f1f]/70",
            ghost: "text-[#b0b0b0] hover:text-white hover:bg-white/10 active:bg-white/5 rounded-full"
        },
        size: {
            sm: "text-sm py-1.5 px-3",
            md: "text-base py-2 px-4",
            lg: "text-lg py-3 px-6",
            icon: "py-1 px-1",
        },
        fullWidth: {
            true: "w-full"
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    }
})

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof button>{
    children: ReactNode
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

export function Button({
    children,
    variant,
    size,
    fullWidth,
    loading = false,
    leftIcon,
    rightIcon,
    disabled,
    className,
    type = "button",
    ...props
}: ButtonProps){

    const isDisabled = disabled || loading;

    return(
        <button
            type={type}
            disabled={isDisabled}
            className={button({ className, variant, size, fullWidth })}
            aria-busy={loading}
            {...props}
        >
            {loading ? (
                <>
                    <Spinner/>
                    <span className="sr-only">Carregando</span>
                </>
            ): (
                <>
                    {leftIcon && <span className="flex items-center">{leftIcon}</span>} 
                    <span className="inline-flex items-center">{children}</span>
                    {rightIcon && <span className="flex items-center">{rightIcon}</span>}
                </>
            )}
        </button>
    )
}
