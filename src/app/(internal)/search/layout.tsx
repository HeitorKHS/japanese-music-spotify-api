import Link from "next/link";
import { Search } from "@/src/components/Search/Search";

interface Links{
    href: string,
    label: string,
};

interface LayoutProps{
    children: React.ReactNode,
    params:{
        query: string,
    },
};

export default async function Layout({ children, params }: LayoutProps){

    const { query } = await params;

    const Links: readonly Links[] = [
        {href: `/search/${query}`, label: "Tudo"},
        {href: `/search/${query}/artists`, label: "Artistas"},
        {href: `/search/${query}/albums`, label: "Álbums"},
        {href: `/search/${query}/tracks`, label: "Músicas"},
    ] as const;

    return(

        <main className="relative min-h-screen content-container">
            <div className="sticky top-16 bg-neutral-900 z-20 py-4">
                <nav className="flex gap-3">
                    {Links.map((link)=>(
                        <Link key={link.href} href={link.href} className="bg-neutral-700/70 rounded-4xl text-sm py-1 px-2">{link.label}</Link>
                    ))}
                </nav>
                <div className="md:hidden pt-8">
                    <Search/>
                </div>
            </div>
            {children}
        </main>

    )

}