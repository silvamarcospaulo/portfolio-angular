export class SliderItem {
    iconeBootstrap?: string;
    iconeCaminho?: string;
    texto?: string;
    link?: string;

    constructor(item?: {
        iconeBootstrap?: string;
        iconeCaminho?: string;
        texto?: string;
        link?: string;
    }) {
        if (item) {
            this.iconeBootstrap = item.iconeBootstrap;
            this.iconeCaminho = item.iconeCaminho;
            this.texto = item.texto;
            this.link = item.link;
        }
    }
}