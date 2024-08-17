export interface Character {
    id: number;
    name: string;
    description: string;
    thumbnail: Thumbnail;
    comics: ComicList;
}

export interface Thumbnail {
    path: string;
    extension: string;
}

export interface ComicList {
    available: number;
    collectionURI: string;
    items: ComicSummary[];
    returned: number;
}

export interface ComicSummary {
    resourceURI: string;
    name: string;
}
