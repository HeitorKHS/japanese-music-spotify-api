'use server'

import { getAllAlbums } from "@/src/services/artistService";

export async function loadAlbum(artistId: string, offset: number){
    return await getAllAlbums(artistId, offset);
}