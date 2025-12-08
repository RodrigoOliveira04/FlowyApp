export interface Pagina {
    id: string;
    codDiario: string,
    Humor: string,
    tituloPagina: string,
    temaPagina: string,
    qtdCaracteresPagina: string,
    dtCriacaoPagina: Date,
    dtExclusaoPagina: Date,
    contPagina: string,
    usuarioId: string
}

export interface UpdatePaginaPayload {
    id: string,
    Humor?: string,
    tituloPagina?: string,
    temaPagina?: string,
    qtdCaracteresPagina?: string,
    dtExclusaoPagina?: Date,
    contPagina?: string
}

export interface PostPaginaPayload {
    Humor: string,
    tituloPagina: string,
    temaPagina: string,
    contPagina: string
}