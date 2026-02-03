'use client'

import { useTheme } from "next-themes";
import { BiSun, BiMoon } from "react-icons/bi";
import { Button } from "../Button/Button";

export function ThemeToggle(){

    const {resolvedTheme, setTheme} = useTheme();

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return(

        <Button
            variant="ghost"
            size="lg"
            onClick={toggleTheme}
            className="p-2 rounded-xl"
        >
            {resolvedTheme === "dark" ? <BiMoon /> : <BiSun />}
        </Button>

    )

}