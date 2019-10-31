export interface Treino {
    id?: string,
    nomeTreino?: string,
    dia?: string, 
    userId?: string,
    descricao?: string,
    criadoEm?: string,
    arquivado?: boolean,
    exercicios?: [string];
}
