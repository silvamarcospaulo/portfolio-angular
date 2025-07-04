import { Habilidade } from './habilidade.model';

export class ExperienciaProfissional {
    constructor(
        public cargo: string,
        public empresa: string,
        public inicio: string,
        public fim: string,
        public descricao: string,
        public habilidades: Habilidade[]
    ) {
        this.cargo = cargo;
        this.empresa = empresa;
        this.inicio = inicio;
        this.fim = fim;
        this.descricao = descricao;
        this.habilidades = habilidades;
    }
}