export interface Address {
    cep: string;
    logradouro: string;
    localidade: string;
    bairro: string;
    uf: string;
    estado: string;
    ddd: number;
    numero: number;
    nomeCompleto? : string;
    cpf? : string;
    complemento? : string;
    telefone? : string;
    tipo? : string
}