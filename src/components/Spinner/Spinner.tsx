import { tv, VariantProps } from "tailwind-variants";

const spinner = tv({
    base:["animate-spin w-5 h-5 rounded-full border-4 border-t-transparent block"],
    variants: {
        color: {
            white: "border-white",
            gray: "border-[#b3b3b3]",
        }
    },
    defaultVariants: {
        color: "white",
    },
})

export interface SpinnerProps extends VariantProps<typeof spinner>{
    className?: string;
}

export function Spinner({ color, className }: SpinnerProps){
  
    return(  
        <span 
            className={`${spinner({ color })} ${className}`}
            role="status"
            aria-label="Carregando"
        />
    )

}