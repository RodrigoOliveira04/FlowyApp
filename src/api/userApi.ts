import client from './client';
import {User, AutenticarUserPayload, RegistrarUserPayload} from './types/user';

export const autenticarUsuario = async (payload: AutenticarUserPayload):
    Promise<User> => {
    const {data} = await client.post<User>(`/Usuarios/Autenticar`, payload);
    return data;
}

export const registrarUsuario = async (payload: RegistrarUserPayload):
    Promise<User> => {
    const {data} = await client.post<User>(`/Usuarios/Registrar`, payload);
    return data;
}