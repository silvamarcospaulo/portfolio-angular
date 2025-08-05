export class FiltroProduto {
    constructor(init?: Partial<FiltroProduto>) {
        Object.assign(this, init);
    }

    pagina?: number = 1;
    limite?: number = 12;
    loja?: string;
    titulo?: string;
    precoInicial?: number;
    precoFinal?: number;
    ratingMinimo?: number;
    ratingMaximo?: number;
    marca?: string;
    categorias?: string;
    entrega?: string;
    ePrime?: boolean;
}