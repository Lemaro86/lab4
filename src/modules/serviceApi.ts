export type IServices = IServiceResult[];

export interface IServiceResult {
    title: string;
    description: string;
    url: string | null;
    cost: string;
    pk: number;

}

export const getServiceList = async (): Promise<IServices> => {
    return fetch('http://localhost:8000/service/').then(
        (response) => response.json()
    );
};

export const getService = async (id: string): Promise<IServiceResult> => {
    return fetch(`http://localhost:8000/service/${id}/`).then(
        (response) => response.json()
    );
}
