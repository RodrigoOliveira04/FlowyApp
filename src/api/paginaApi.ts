import client from './client';
import { Pagina, UpdatePaginaPayload, PostPaginaPayload } from './types/pagina';

export const getById = async (id: string): Promise<Pagina> => {
    const { data } = await client.get<Pagina>(`/Pagina/${id}`);
    return data;
};

export const getByUser = async (usuarioId: string): Promise<Pagina> => {
    const { data } = await client.get<Pagina>(`/Pagina/${usuarioId}`);
    return data;
};

export const postPagina = async (payload: PostPaginaPayload):
    Promise<Pagina> => {
    const { data } = await client.post<Pagina>(`/Pagina/`, payload);
    return data;
}

export const updatePagina = async (payload: UpdatePaginaPayload):
    Promise<Pagina> => {
    const { data } = await client.put<Pagina>(`/Pagina/`, payload);
    return data;
};

export const deletePagina = async (id: string):
    Promise<Pagina> => {
    const { data } = await client.delete<Pagina>(`/Pagina/${id}`);
    return data;
};
