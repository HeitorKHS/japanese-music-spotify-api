import Link from "next/link";
import { ReactNode } from "react";

interface LayoutProps{
    children: ReactNode,
    params:{
        query: string,
    },
};

interface Tabs {
    href: string;
    label: string;
}

export default async function Layout({children, params}: LayoutProps){

    const { query } = await params;

    const tabs: readonly Tabs[] = [
        { href: `/search/${query}`, label: "Início"},
        { href: `/search/${query}/artists`, label: "Artistas"},
        { href: `/search/${query}/albums`, label: "Álbuns"},
        { href: `/search/${query}/tracks`, label: "Músicas"},
    ] as const;

    return(

        <div className="pt-[59px] md:pt-[64px]">
            <div className="fixed py-5 content-container flex justify-center gap-5 bg-[var(--color-background)]">
                {tabs.map((tab)=>(
                    <Link key={tab.href} href={tab.href} className="py-1 px-4 bg-white/5 rounded-4xl">{tab.label}</Link>
                ))}
            </div>
            <div>
                {children}
            </div>
        </div>

    )

}