export interface User {
    Id: string,
    Username: string,
    PasswordString: string,
    PasswordHash: string,
    PasswordSalt: string,
    codDiarioUsuario: string,
    idPerfil: string,
    Email: string,
    Token: string,
    avatar?: string,
    infoPerfil?: string,
    qtdXp?: number,
    createdAt: string
}

export interface RegistrarUserPayload {
    Username: string,
    PasswordString: string,
    Email: string
}

export interface AutenticarUserPayload {
    Username: string,
    PasswordString: string,
    Email: string
}