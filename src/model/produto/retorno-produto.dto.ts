import { Produto } from "./produto";

export class RetornoProdutoDto {
    pagina!: number;
    limite!: number;
    produtos!: Produto[];
    quantidadeTotal!: number;

    constructor(init?: Partial<RetornoProdutoDto>) {
        Object.assign(this, init);
    }
}