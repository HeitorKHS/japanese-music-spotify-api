import Link from "next/link";

interface MenuItem {
    href: string;
    label: string;
}

const menuItems: readonly MenuItem[] = [
    { href: "/", label: "Início" },
    { href: "/music", label: "Músicas" },
    { href: "/artists", label: "Artistas" },
    { href: "/genres", label: "Gêneros" }
] as const;

interface MenuProps{
    setMenuOpen?: (open:boolean) => void;
    isMobile?: boolean;
}

export function Menu({setMenuOpen, isMobile} : MenuProps){

    return(
        <nav aria-label="Menu principal">
            <ul className={`flex ${isMobile ? `flex-col gap-5 mt-5` : `gap-8`}`}>
                {menuItems.map((item) => (
                    <li key={item.href}>
                        <Link 
                            href={item.href}
                            onClick={() => isMobile && setMenuOpen?.(false)}
                            className="hover:opacity-40 transition-opacity menu-item">
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}