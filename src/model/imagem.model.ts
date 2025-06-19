export class Imagem {
    constructor(
        public url: string,
        public caminhoImagem: string,
        public palavraChave: string,
        public titulo: string,
        public tipoDeProjeto: string,
        public descricao: string
    ) { }
}