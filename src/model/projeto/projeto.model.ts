import { Link } from "../link.model";

export class Projeto {
    constructor(
        {
            url,
            caminhoImagem,
            palavraChave,
            titulo,
            tipoDeProjeto,
            descricao,
            tecnologias,
            urlGithub,
            urlSecundaria
        }: {
            url?: string;
            caminhoImagem?: string;
            palavraChave?: string;
            titulo?: string;
            tipoDeProjeto?: string;
            descricao?: string;
            tecnologias?: Link[];
            urlGithub?: string;
            urlSecundaria?: string;
        }
    ) {
        this.url = url;
        this.caminhoImagem = caminhoImagem;
        this.palavraChave = palavraChave;
        this.titulo = titulo;
        this.tipoDeProjeto = tipoDeProjeto;
        this.descricao = descricao;
        this.tecnologias = tecnologias;
        this.urlGithub = urlGithub;
        this.urlSecundaria = urlSecundaria;
    }

    public url?: string;
    public caminhoImagem?: string;
    public palavraChave?: string;
    public titulo?: string;
    public tipoDeProjeto?: string;
    public descricao?: string;
    public tecnologias?: Link[];
    public urlGithub?: string;
    public urlSecundaria?: string;
}