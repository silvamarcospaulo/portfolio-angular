export class ExperienciaProfissional {
    constructor(
        public cargo: string,
        public empresa: string,
        public inicio: string,
        public fim: string,
        public descricao: string
    ) {
        this.cargo = cargo;
        this.empresa = empresa;
        this.inicio = inicio;
        this.fim = fim;
        this.descricao = descricao;
    }
}