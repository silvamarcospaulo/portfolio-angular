export class Link {
    constructor(
        public nome: string,
        public url?: string,
        public icone?: string
    ) {
        this.nome = nome;
        this.url = url;
        this.icone = icone;
    }
}