export class Produto {
    constructor(
        public id: string,
        public loja: string,
        public identificador: string,
        public titulo:  string,
        public descricao: string,
        public preco: string,
        public imagem: string,
        public link: string,
        public dataInclusao: Date,
        public precoOriginal?: string,
        public desconto?: string,
        public rating?: number,
        public totalAvaliacoes?: number,
        public marca?: string,
        public asin?: string,
        public categorias?: string[],
        public features?: string[],
        public disponibilidade?: string,
        public entrega?: string,
        public vendedor?: string,
        public ePrime?: boolean,
        public acessos?: number
    ) { }
}