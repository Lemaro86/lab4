import { ITunesResult } from "./itunesApi.ts";
import {IServices} from "./serviceApi.ts";

export const ALBUMS_MOCK: ITunesResult = {
    resultCount: 3,
    results: [
        {
            wrapperType: "track",
            artistName: "Pink Floyd",
            collectionCensoredName: "The Wall",
            trackViewUrl: "",
            artworkUrl100: "",
            collectionId: 1,
        },
        {
            wrapperType: "track",
            artistName: "Queen",
            collectionCensoredName: "A Night At The Opera",
            trackViewUrl: "",
            artworkUrl100: "",
            collectionId: 133,
        },
        {
            wrapperType: "track",
            artistName: "AC/DC",
            collectionCensoredName: "Made in Heaven",
            trackViewUrl: "",
            artworkUrl100: "",
            collectionId: 13,
        },
    ],
};

export const ServiceMock: IServices = [
    {
        title: 'Обработка территории от грызунов',
        description: 'Обработка территории от грызунов 2',
        cost: '5',
        pk: 1,
        url: '/net.jpg'
    },
    {
        title: 'Обработка моков после кетча',
        description: 'Обработка базы после дропа',
        cost: '5',
        pk: 2,
        url: '/net.jpg'
    },
    {
        title: 'Обработка территории от грызунов',
        description: 'Обработка территории от грызунов 2',
        cost: '5',
        pk: 3,
        url: '/net.jpg'
    }
]
