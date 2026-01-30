'use client'

import { SpotifyAlbum, SpotifyPagination } from "@/src/types/spotify";
import { useState } from "react";
import { loadAlbum } from "@/src/actions/loadAlbum";
import { AlbumList } from "../../AlbumList/AlbumList";
import { Button } from "../../Button/Button";
import { IoReload } from "react-icons/io5";

interface FullDiscographyProps{
    artistId: string,
    initialAlbums: SpotifyPagination<SpotifyAlbum>,
};

export function FullDiscography({artistId, initialAlbums}: FullDiscographyProps){

    const [albums, setAlbums] = useState<SpotifyAlbum[]>(initialAlbums.items);
    const [offset, setOffset] = useState<number>(initialAlbums.offset + 20);
    const [hasMore, setHasMore] = useState<boolean>(initialAlbums.next !== null);

    const loadMore = async () => {

        const data = await loadAlbum(artistId, offset);

        setAlbums((prev)=>[...prev, ...data.albums.items]);
        setOffset(offset + 20);
        setHasMore(data.albums.next !== null);

    }

    return(

        <div className="mt-5">
            <AlbumList albums={albums} />
            {hasMore && (
                <div className="flex justify-center my-5">
                    <Button
                        variant="primary"
                        rightIcon={<IoReload/>}
                        onClick={loadMore}
                    >
                        <span>Carregar mais</span>
                    </Button>
                </div>
            )}
        </div>

    )

}