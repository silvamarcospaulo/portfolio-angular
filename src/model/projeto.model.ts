export class Projeto {
    constructor(
        public url: string,
        public caminhoImagem: string,
        public palavraChave: string,
        public titulo: string,
        public tipoDeProjeto: string,
        public descricao: string
    ) {
        this.url = url;
        this.caminhoImagem = caminhoImagem;
        this.palavraChave = palavraChave;
        this.titulo = titulo;
        this.tipoDeProjeto = tipoDeProjeto;
        this.descricao = descricao;
    }
}