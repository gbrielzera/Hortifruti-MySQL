export interface Produto{
    idProduto:number;
    nome:string;
    descricao:string;
    preco:number;
    quantidade:number;
    categoriaId:number;
    dataCriacao:string;
    dataAtualizacao?:string | null
}