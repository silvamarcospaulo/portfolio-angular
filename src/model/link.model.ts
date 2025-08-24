export class Link {
    constructor(
        { nome, url, icone, imagem }:
            { nome?: string; url?: string; icone?: string; imagem?: string }
    ) {
        this.nome = nome;
        this.url = url;
        this.icone = icone;
        this.imagem = imagem;
    }

    public nome?: string;
    public url?: string;
    public icone?: string;
    public imagem?: string;
}

export class Card {
    constructor(
        { nome, icone, imagem, card, dropdown }:
            { nome?: string; icone?: string; imagem?: string; card?: Link; dropdown?: Link[] }
    ) {
        this.nome = nome;
        this.icone = icone;
        this.imagem = imagem;
        this.card = card;
        this.dropdown = dropdown;
    }

    public nome?: string;
    public icone?: string;
    public imagem?: string;
    public card?: Link;
    public dropdown?: Link[];
}