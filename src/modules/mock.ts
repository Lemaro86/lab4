import {IServices} from "./serviceApi.ts";
import {IMAGE_DEFAULT} from "../constants/common.ts";

export const ServiceMock: IServices = [
    {
        title: 'Обработка территории от грызунов',
        description: 'Обработка территории от грызунов 2',
        cost: '670',
        pk: 1,
        url: IMAGE_DEFAULT
    },
    {
        title: 'Обработка моков после кетча',
        description: 'Обработка базы после дропа',
        cost: '5',
        pk: 2,
        url: IMAGE_DEFAULT
    },
    {
        title: 'Обработка территории от грызунов',
        description: 'Обработка территории от грызунов 2',
        cost: '20',
        pk: 3,
        url: IMAGE_DEFAULT
    }
]
