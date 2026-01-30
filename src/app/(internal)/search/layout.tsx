import { SearchHeader } from "@/src/components/SearchHeader/SearchHeader";

export default async function Layout({ children }: { children: React.ReactNode }){

    return(

        <>
            <SearchHeader/>
            <main className="pt-25.5 sm:pt-15">
                {children}
            </main>     
        </>

    )

}