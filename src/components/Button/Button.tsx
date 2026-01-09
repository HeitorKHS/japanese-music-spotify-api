import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
    base:[
        "flex items-center justify-center gap-2 duration-200 ease-out whitespace-nowrap cursor-pointer",
    ],
    variants:{
        variant:{
            primary:"bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold px-3 py-2",
            ghost:"text-neutral-400 hover:text-white",
        },
        size:{
            sm:"text-sm",
            md:"text-base",
            lg:"text-lg",
        },
    },
});

export interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof button>{
    children: ReactNode
    loading?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
}

export function Button({
    children,
    variant,
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    className,
    ...props
}: ButtonProps){

    return(
        <button
            type="button"
            className={button({className, variant, size})}
            {...props}
        >
            {loading ? (
                <div>Carregando</div>
            ):(
                <>
                    {leftIcon && leftIcon}
                    {children}
                    {rightIcon && rightIcon}
                </>
            )}
        </button>
    )

}