import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const outputPath = resolve(__dirname, '../src/app/componentes/paginas/promocoes/data/produto.ts');

export class LinkProduto {
    constructor(
        public id: string,
        public link: string,
        public loja: string
    ) { }
}

export class Produto {
    constructor(
        public id: string,
        public loja: string,
        public identificador: string,
        public titulo: string,
        public descricao: string,
        public preco: string,
        public imagem: string,
        public link: string,
        public dataInclusao: Date,
        public precoOriginal?: string,
        public desconto?: string,
        public rating?: number,
        public totalAvaliacoes?: number,
        public marca?: string,
        public asin?: string,
        public categorias?: string[],
        public features?: string[],
        public disponibilidade?: string,
        public entrega?: string,
        public vendedor?: string,
        public ePrime?: boolean
    ) { }
}

function parseProdutoList(content: string): Produto[] {
    const regex = /new Produto\(([^)]+)\)/g;
    const produtos: Produto[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
        const args = match[1].split(/,(?![^\[]*\])/).map(arg => arg.trim().replace(/^"|"$/g, ''));
        produtos.push(new Produto(
            args[0],
            args[1],
            args[2],
            args[3],
            args[4],
            args[5],
            args[6],
            args[7],
            new Date(args[8]),
            args[9] || undefined,
            args[10] || undefined,
            args[11] ? Number(args[11]) : undefined,
            args[12] ? Number(args[12]) : undefined,
            args[13] || undefined,
            args[14] || undefined,
            args[15] ? JSON.parse(args[15]) : undefined,
            args[16] ? JSON.parse(args[16]) : undefined,
            args[17] || undefined,
            args[18] || undefined,
            args[19] || undefined,
            args[20] === 'true'
        ));
    }
    return produtos;
}

function extrairASIN(link: string): string {
    const match = link.match(/\/([A-Z0-9]{10})(?:[\/?]|$)/);
    return match ? match[1] : '';
}

async function extrairProduto(id: string, link: string, loja: string, data: string) {
    try {
        const res = await axios.get(link, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/58.0.3029.110 Safari/537.3'
            },
        });

        const $ = cheerio.load(res.data);

        const titulo = $('#productTitle').text().trim();
        const preco = $('.a-price .a-offscreen').first().text().trim();
        const precoOriginal = $('.a-price.a-text-price .a-offscreen').first().text().trim() || undefined;
        const imagem = $('#landingImage').attr('src') || '';
        const descricao = $('#feature-bullets ul li span')
            .toArray()
            .map(el => $(el).text().trim())
            .filter(texto => texto.length > 0)
            .join(' ');

        const ratingText = $('.a-icon-alt').first().text().trim();
        const rating = ratingText ? parseFloat(ratingText.split(' ')[0].replace(',', '.')) : undefined;

        const totalAvaliacoesText = $('#acrCustomerReviewText').text().trim();
        const totalAvaliacoes = totalAvaliacoesText ? parseInt(totalAvaliacoesText.replace(/\D/g, '')) : undefined;

        const marca = $('#bylineInfo').text().trim() || undefined;
        const disponibilidade = $('#availability').text().trim() || undefined;
        const vendedor = $('#merchant-info').text().trim() || undefined;
        const ePrime = $('#primePopover').length > 0;

        const asin = extrairASIN(link);

        return new Produto(
            id.toString(),
            loja,
            asin,
            titulo,
            descricao,
            preco,
            imagem,
            link,
            new Date(data),
            precoOriginal,
            undefined,
            rating,
            totalAvaliacoes,
            marca,
            asin,
            undefined,
            undefined,
            disponibilidade,
            undefined,
            vendedor,
            ePrime
        );
    } catch (error) {
        console.error(`Erro ao processar ${link}`, error);
        return null;
    }
}

(async () => {
    const LINKS_PRODUTOS_AMAZON: LinkProduto[] = [
        new LinkProduto(
            "1",
            "https://www.amazon.com.br/Logitech-Inteligente-Easy-Switch-dispositivos-Recarreg%C3%A1vel/dp/B09LYZP1LG?_encoding=UTF8&pd_rd_w=vdyfo&content-id=amzn1.sym.8e4d82e3-67d8-4ee1-add4-950ff2dc6154%3Aamzn1.symc.a68f4ca3-28dc-4388-a2cf-24672c480d8f&pf_rd_p=8e4d82e3-67d8-4ee1-add4-950ff2dc6154&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=1b4e99df6645b39c237a9693dd65ca14&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "2",
            "https://www.amazon.com.br/Logitech-Inteligente-Easy-Switch-dispositivos-Recarreg%C3%A1vel/dp/B09LYZP1LG?_encoding=UTF8&pd_rd_w=vdyfo&content-id=amzn1.sym.8e4d82e3-67d8-4ee1-add4-950ff2dc6154%3Aamzn1.symc.a68f4ca3-28dc-4388-a2cf-24672c480d8f&pf_rd_p=8e4d82e3-67d8-4ee1-add4-950ff2dc6154&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=1b4e99df6645b39c237a9693dd65ca14&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "3",
            "https://www.amazon.com.br/Biblioteca-Dostoi%C3%A9vski-Livros-Edi%C3%A7%C3%A3o-Luxo/dp/6584956776?_encoding=UTF8&pd_rd_w=hqHSr&content-id=amzn1.sym.09916995-565b-4f2a-a31f-48091c48a79c%3Aamzn1.symc.5111b5a7-85f4-4b0c-88b2-c0a74bb618a6&pf_rd_p=09916995-565b-4f2a-a31f-48091c48a79c&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=66e36097241c6983a609dcb9cee8c0d8&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "4",
            "https://www.amazon.com.br/Cole%C3%A7%C3%A3o-Bobbie-Goods-quentes-aquilo/dp/6555116986?_encoding=UTF8&pd_rd_w=hqHSr&content-id=amzn1.sym.09916995-565b-4f2a-a31f-48091c48a79c%3Aamzn1.symc.5111b5a7-85f4-4b0c-88b2-c0a74bb618a6&pf_rd_p=09916995-565b-4f2a-a31f-48091c48a79c&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=f7c15b690c336bb19b0f96348a270af0&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "5",
            "https://www.amazon.com.br/Use-Cabe%C3%A7a-Java-Aprendiz-Programa%C3%A7%C3%A3o/dp/8550819883?_encoding=UTF8&pd_rd_w=hqHSr&content-id=amzn1.sym.09916995-565b-4f2a-a31f-48091c48a79c%3Aamzn1.symc.5111b5a7-85f4-4b0c-88b2-c0a74bb618a6&pf_rd_p=09916995-565b-4f2a-a31f-48091c48a79c&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=194c09c63ba1b9bee27c41e83321bf28&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "6",
            "https://www.amazon.com.br/Mouse-Vertical-Ergon%C3%B4mico-Sem-Recarreg%C3%A1vel/dp/B0F4YXY9YD?_encoding=UTF8&pd_rd_w=kEjWx&content-id=amzn1.sym.09916995-565b-4f2a-a31f-48091c48a79c%3Aamzn1.symc.5111b5a7-85f4-4b0c-88b2-c0a74bb618a6&pf_rd_p=09916995-565b-4f2a-a31f-48091c48a79c&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=7ff1d5807671e5df4fbc2e8603df1481&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "7",
            "https://www.amazon.com.br/Microfone-HyperX-Solocast-USB-Compat%C3%ADvel/dp/B08KFL3SFV?_encoding=UTF8&pd_rd_w=WB7B3&content-id=amzn1.sym.09916995-565b-4f2a-a31f-48091c48a79c%3Aamzn1.symc.5111b5a7-85f4-4b0c-88b2-c0a74bb618a6&pf_rd_p=09916995-565b-4f2a-a31f-48091c48a79c&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=cbc655e97f28ea4eea1a45913acd2e1e&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "8",
            "https://www.amazon.com.br/FIFINE-Suporte-microfone-gerenciamento-branco-BM88W/dp/B0CFPY6TJB?_encoding=UTF8&pd_rd_w=2Jgww&content-id=amzn1.sym.454738cc-1d38-49bf-ab88-1bd74f2484a1%3Aamzn1.symc.abfa8731-fff2-4177-9d31-bf48857c2263&pf_rd_p=454738cc-1d38-49bf-ab88-1bd74f2484a1&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=2b5eaadfbd0561b8874ba032d64dd57b&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "9",
            "https://www.amazon.com.br/fire-tv-stick-hd/dp/B0CQMT33WX?_encoding=UTF8&pd_rd_w=tJ88w&content-id=amzn1.sym.52e74d21-088e-4a9d-888d-8b14bf95d4ae&pf_rd_p=52e74d21-088e-4a9d-888d-8b14bf95d4ae&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=51594ab812c9708b98cd4449c088d2bd&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "10",
            "https://www.amazon.com.br/Garnier-Uniform-Hidratante-Facial-Antimanchas/dp/B0DP82WCWS?_encoding=UTF8&pd_rd_w=PTgAZ&content-id=amzn1.sym.09916995-565b-4f2a-a31f-48091c48a79c%3Aamzn1.symc.5111b5a7-85f4-4b0c-88b2-c0a74bb618a6&pf_rd_p=09916995-565b-4f2a-a31f-48091c48a79c&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=3b04f0f7f08b4fc86fb41a0f38eeaf22&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "11",
            "https://www.amazon.com.br/Limpeza-Profunda-Av%C3%A8ne-Cleanance-Intense/dp/B09323P3RV?_encoding=UTF8&pd_rd_w=PTgAZ&content-id=amzn1.sym.09916995-565b-4f2a-a31f-48091c48a79c%3Aamzn1.symc.5111b5a7-85f4-4b0c-88b2-c0a74bb618a6&pf_rd_p=09916995-565b-4f2a-a31f-48091c48a79c&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=99d1352a4a319a8d58a29b1692cc3e81&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "12",
            "https://www.amazon.com.br/Limpeza-Principia-%C3%81cido-Salic%C3%ADlico-Glicerina/dp/B0B6LZ36XV?_encoding=UTF8&pd_rd_w=PTgAZ&content-id=amzn1.sym.09916995-565b-4f2a-a31f-48091c48a79c%3Aamzn1.symc.5111b5a7-85f4-4b0c-88b2-c0a74bb618a6&pf_rd_p=09916995-565b-4f2a-a31f-48091c48a79c&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=52631d238f4ff81cc4aa24c234431659&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "13",
            "https://www.amazon.com.br/Roche-Posay-Effaclar-Concentrado-Gel-300g/dp/B07KYVSKWR?_encoding=UTF8&pd_rd_w=PTgAZ&content-id=amzn1.sym.09916995-565b-4f2a-a31f-48091c48a79c%3Aamzn1.symc.5111b5a7-85f4-4b0c-88b2-c0a74bb618a6&pf_rd_p=09916995-565b-4f2a-a31f-48091c48a79c&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=97010c1b9709d5e771cb2a41f25d15ef&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "14",
            "https://www.amazon.com.br/FEIRA-CRONOLOLA-Cronograma-Capilar-Produtos/dp/B0DKVJ1HWB?_encoding=UTF8&pd_rd_w=RQ0nN&content-id=amzn1.sym.7e42413f-b2ab-4fd9-8f6f-101dfaa3938e&pf_rd_p=7e42413f-b2ab-4fd9-8f6f-101dfaa3938e&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=327fe515d20b75ea8de735639ec76580&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "15",
            "https://www.amazon.com.br/Eudora-Si%C3%A0ge-Poderosos-Elixir-Overnight/dp/B096CRXYRB?_encoding=UTF8&pd_rd_w=RQ0nN&content-id=amzn1.sym.7e42413f-b2ab-4fd9-8f6f-101dfaa3938e&pf_rd_p=7e42413f-b2ab-4fd9-8f6f-101dfaa3938e&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=ff5de8ecdf1afd6939bb61a9aa6372d8&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "16",
            "https://www.amazon.com.br/Creme-Abacate-Nutritivo-190Ml-1001083/dp/B093RHCMV5?_encoding=UTF8&pd_rd_w=RQ0nN&content-id=amzn1.sym.7e42413f-b2ab-4fd9-8f6f-101dfaa3938e&pf_rd_p=7e42413f-b2ab-4fd9-8f6f-101dfaa3938e&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=9f3ae887e72fd55f099286a907f26e7d&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "17",
            "https://www.amazon.com.br/M%C3%A1scara-l%C3%ADquida-Lamelar-200-Ml/dp/B0D6RPMPBZ?_encoding=UTF8&pd_rd_w=RQ0nN&content-id=amzn1.sym.7e42413f-b2ab-4fd9-8f6f-101dfaa3938e&pf_rd_p=7e42413f-b2ab-4fd9-8f6f-101dfaa3938e&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=7e65180e31ad1b4f19bd6bdb2bb1ea3a&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "18",
            "https://www.amazon.com.br/echo-show-8-preto/dp/B0BLS1XM8L?_encoding=UTF8&pd_rd_w=rIkbA&content-id=amzn1.sym.09916995-565b-4f2a-a31f-48091c48a79c%3Aamzn1.symc.5111b5a7-85f4-4b0c-88b2-c0a74bb618a6&pf_rd_p=09916995-565b-4f2a-a31f-48091c48a79c&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=d03061912b124d60fdc1e8a7b2db528a&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "19",
            "https://www.amazon.com.br/Suporte-ajust%C3%A1vel-gera%C3%A7%C3%A3o-porta-carregamento/dp/B0BVP386MC?_encoding=UTF8&pd_rd_w=rIkbA&content-id=amzn1.sym.09916995-565b-4f2a-a31f-48091c48a79c%3Aamzn1.symc.5111b5a7-85f4-4b0c-88b2-c0a74bb618a6&pf_rd_p=09916995-565b-4f2a-a31f-48091c48a79c&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=a5baf07fbd23ccf8d07940917841df4c&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "20",
            "https://www.amazon.com.br/PHILIPS-TAT1109BK-00-Bluetooth-Microfone/dp/B0DVMQVVDY?_encoding=UTF8&pd_rd_w=zoaPl&content-id=amzn1.sym.52e74d21-088e-4a9d-888d-8b14bf95d4ae&pf_rd_p=52e74d21-088e-4a9d-888d-8b14bf95d4ae&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=3d255b4bfa03df990d8677eb7e414f5e&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "21",
            "https://www.amazon.com.br/PHILIPS-TAT1109WT-00-Bluetooth-Microfone/dp/B0DVMZVMYQ?_encoding=UTF8&pd_rd_w=zoaPl&content-id=amzn1.sym.52e74d21-088e-4a9d-888d-8b14bf95d4ae&pf_rd_p=52e74d21-088e-4a9d-888d-8b14bf95d4ae&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&linkCode=ll1&tag=silvamarcos0b-20&linkId=48e03ed9bc6b985feccb9f93f36f35e1&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "22",
            "https://www.amazon.com.br/Pilha-Alcalina-Pequena-Duracell-3020720/dp/B0778VZYVV?_encoding=UTF8&pd_rd_w=zoaPl&content-id=amzn1.sym.52e74d21-088e-4a9d-888d-8b14bf95d4ae&pf_rd_p=52e74d21-088e-4a9d-888d-8b14bf95d4ae&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=c98c70f066b97b448f893cd197b3aa51&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "23",
            "https://www.amazon.com.br/Apple-iPhone-13-256-GB-das-estrelas/dp/B09T4WC9GN?_encoding=UTF8&pd_rd_w=zoaPl&content-id=amzn1.sym.52e74d21-088e-4a9d-888d-8b14bf95d4ae&pf_rd_p=52e74d21-088e-4a9d-888d-8b14bf95d4ae&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=uh2cM&pd_rd_r=f865e311-60c6-4d30-9991-21713070250a&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=66ff0b5b3856a4aaa7c3efacc878c1f8&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "24",
            "https://www.amazon.com.br/Ergon%C3%B4mico-Articulado-Compacto-Retr%C3%A1til-Monitores/dp/B0765KZ264?pd_rd_w=Fm5iX&content-id=amzn1.sym.a6bf656f-dec5-4bf8-a331-f2631d86c1a8&pf_rd_p=a6bf656f-dec5-4bf8-a331-f2631d86c1a8&pf_rd_r=R2KWPNA5HPQGWWA2YDD7&pd_rd_wg=wg5Br&pd_rd_r=5be087c1-a9eb-4e72-abd6-c101a5a227a8&pd_rd_i=B0765KZ264&psc=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=79310e9dfe1de43728eb66ee71b01e02&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "25",
            "https://www.amazon.com.br/Pedestal-Suporte-Articulado-Microfone-Studio/dp/B08WT9M4FD?pd_rd_w=Fm5iX&content-id=amzn1.sym.a6bf656f-dec5-4bf8-a331-f2631d86c1a8&pf_rd_p=a6bf656f-dec5-4bf8-a331-f2631d86c1a8&pf_rd_r=R2KWPNA5HPQGWWA2YDD7&pd_rd_wg=wg5Br&pd_rd_r=5be087c1-a9eb-4e72-abd6-c101a5a227a8&pd_rd_i=B08WT9M4FD&psc=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=b95bcaa6e8693aa123341e1ac6144d7b&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "26",
            "https://www.amazon.com.br/C3Tech-Suporte-microfone-Aranha-MI-S10BK/dp/B0C415BPVG?pd_rd_w=Fm5iX&content-id=amzn1.sym.a6bf656f-dec5-4bf8-a331-f2631d86c1a8&pf_rd_p=a6bf656f-dec5-4bf8-a331-f2631d86c1a8&pf_rd_r=R2KWPNA5HPQGWWA2YDD7&pd_rd_wg=wg5Br&pd_rd_r=5be087c1-a9eb-4e72-abd6-c101a5a227a8&pd_rd_i=B0C415BPVG&psc=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=575079a4df860f6ef1d450fc7dc7d114&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "27",
            "https://www.amazon.com.br/UGREEN-carregamento-Adaptador-transfer%C3%AAncia-Compat%C3%ADvel/dp/B0BR3M8XHK?pd_rd_w=Fm5iX&content-id=amzn1.sym.a6bf656f-dec5-4bf8-a331-f2631d86c1a8&pf_rd_p=a6bf656f-dec5-4bf8-a331-f2631d86c1a8&pf_rd_r=R2KWPNA5HPQGWWA2YDD7&pd_rd_wg=wg5Br&pd_rd_r=5be087c1-a9eb-4e72-abd6-c101a5a227a8&pd_rd_i=B0BR3M8XHK&psc=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=8b775fc1c6c9cf42b7cd245d612c89d3&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "28",
            "https://www.amazon.com.br/Knup-SUPORTE-MICROFONE-P-GRAVA%C3%87%C3%83O/dp/B08B459NF9?pd_rd_w=Fm5iX&content-id=amzn1.sym.a6bf656f-dec5-4bf8-a331-f2631d86c1a8&pf_rd_p=a6bf656f-dec5-4bf8-a331-f2631d86c1a8&pf_rd_r=R2KWPNA5HPQGWWA2YDD7&pd_rd_wg=wg5Br&pd_rd_r=5be087c1-a9eb-4e72-abd6-c101a5a227a8&pd_rd_i=B08B459NF9&psc=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=2061d733120fe0e2c3241a55411f685f&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "29",
            "https://www.amazon.com.br/Teclado-Logitech-Conex%C3%A3o-Bluetooth-Easy-Switch/dp/B0CJ3WFW9H?_encoding=UTF8&pd_rd_w=vdyfo&content-id=amzn1.sym.8e4d82e3-67d8-4ee1-add4-950ff2dc6154%3Aamzn1.symc.a68f4ca3-28dc-4388-a2cf-24672c480d8f&pf_rd_p=8e4d82e3-67d8-4ee1-add4-950ff2dc6154&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=3343d3a9581bffcd610d5b11429f4bc6&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "30",
            "https://www.amazon.com.br/hz/mobile/mission?p=JKrtdFtTKKndZfHsJLyhRJn05h%2FSPzOSxR8Zgx02MH1lX4mEen7RR8z2tZ4zi8ufB%2FmWyr1QxnFJygnjnTowj3KkrFMaDnZQcPkntszSqUuxHPs%2Fk7zRAQ6pnT%2FIuyIUTRjNYjiyYG0Fe13bvuuoRol%2FJsI5kSN2cKk8a0gnyHOg0KedII6cfftUtSx%2BQjS%2Fjnzl%2FxmYHRTu0Nd4CN6c4KR%2F3wL0q05ZvYaocipVXvG6PJlDgLgzTFjmSj5yEu2UcIOusjpZPYlKhQYJ7LxPcLw9qvoF147U8ynjmLcT%2Bzlecdtk2wT4%2BifdhZbA7w4fnMCft9kqag0CFg8XA7yRtd4jFzBJBgcNZXrmCc5lSD2akPcltbR7ojQtGzEAeMYEErzL6vzOLKTRZS1q9wTx2XUPhz6e4Vq3&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pf_rd_p=6f53bf9e-5c03-412c-baa1-2d3a02e01dad&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&pd_rd_w=AWof8&pd_rd_wg=BnOUj&linkCode=ll2&tag=silvamarcos0b-20&linkId=c3bc2d958159c1bdc6b975e7ec698e4d&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "31",
            "https://www.amazon.com.br/hz/mobile/mission?p=51mhgOEc3PJMdTxsLrJy3KcYxbZubb%2Brzzp6vAA0VQtTEiPTIztbiRX9Ma2p9Sz%2BIUbsM%2F5Q5kmZmedCnkBC1W348LLWBOytySRG2e2%2BliDKEUQXV2Ds0XXgxkH5upI%2BniqiMm5pesHHHY2dfxz8XC7GevFAYCz5mNHyj2w2jSsvB7p2HqgM4%2FMfGmNwWkb25zCbCS7f3oJhYWQkq7BzSwvbztu08R97q%2BhadvavqNTHamvS1o8C3NtnK4zJC0w1KBzXDzT5Ise8mVdk7ogoSWTFDH%2FeCgIyYolnwLZVDeiKIeBFAa4Yq1mwAA%2B88GemQPCCzTfpgNycVTZz6ZW9RIFwkB2p4%2BVPbqBKlscfQwfbXlppt%2BwjieVHtZ5K%2BxNOpCWyI9dJrx6La5Rt0U3ssG30qwjaRJx%2B&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pf_rd_p=6f53bf9e-5c03-412c-baa1-2d3a02e01dad&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&pd_rd_w=AWof8&pd_rd_wg=BnOUj&linkCode=ll2&tag=silvamarcos0b-20&linkId=e844d6557df09c70eba8c3c2d5a5f45c&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "32",
            "https://www.amazon.com.br/Monitor-LG-UltraGear-DisplayPort-FreeSyncTM/dp/B0D8DPT7ZY?pd_rd_w=ZDLNA&content-id=amzn1.sym.555f13f7-45b6-473c-bea4-65b4c3d4edb6%3Aamzn1.symc.40e6a10e-cbc4-4fa5-81e3-4435ff64d03b&pf_rd_p=555f13f7-45b6-473c-bea4-65b4c3d4edb6&pf_rd_r=RRHAHM4698ZMM2RWGVHB&pd_rd_wg=qRt0V&pd_rd_r=888510e2-de52-4d36-a81a-a8ed9ecfbc4e&pd_rd_i=B0D8DPT7ZY&linkCode=ll1&tag=silvamarcos0b-20&linkId=f9dd41b587ac245b195ba3bab430176e&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "33",
            "https://www.amazon.com.br/Monitor-Gamer-Samsung-Freesync-Preto/dp/B098ZN8NTX?pd_rd_w=ZDLNA&content-id=amzn1.sym.555f13f7-45b6-473c-bea4-65b4c3d4edb6%3Aamzn1.symc.40e6a10e-cbc4-4fa5-81e3-4435ff64d03b&pf_rd_p=555f13f7-45b6-473c-bea4-65b4c3d4edb6&pf_rd_r=RRHAHM4698ZMM2RWGVHB&pd_rd_wg=qRt0V&pd_rd_r=888510e2-de52-4d36-a81a-a8ed9ecfbc4e&pd_rd_i=B098ZN8NTX&linkCode=ll1&tag=silvamarcos0b-20&linkId=e709c73de4af88659356f19a3e16b141&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "34",
            "https://www.amazon.com.br/Samsung-Monitor-24-F24T350FHL-Preto/dp/B098ZLDFG7?pd_rd_w=ZDLNA&content-id=amzn1.sym.555f13f7-45b6-473c-bea4-65b4c3d4edb6%3Aamzn1.symc.40e6a10e-cbc4-4fa5-81e3-4435ff64d03b&pf_rd_p=555f13f7-45b6-473c-bea4-65b4c3d4edb6&pf_rd_r=RRHAHM4698ZMM2RWGVHB&pd_rd_wg=qRt0V&pd_rd_r=888510e2-de52-4d36-a81a-a8ed9ecfbc4e&pd_rd_i=B098ZLDFG7&linkCode=ll1&tag=silvamarcos0b-20&linkId=fc58e46dfe98cc95572775c7c89372de&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "35",
            "https://www.amazon.com.br/Monitor-AOC-Ajuste-Altura-24G4/dp/B0DLPB4CH6?pd_rd_w=ZDLNA&content-id=amzn1.sym.555f13f7-45b6-473c-bea4-65b4c3d4edb6%3Aamzn1.symc.40e6a10e-cbc4-4fa5-81e3-4435ff64d03b&pf_rd_p=555f13f7-45b6-473c-bea4-65b4c3d4edb6&pf_rd_r=RRHAHM4698ZMM2RWGVHB&pd_rd_wg=qRt0V&pd_rd_r=888510e2-de52-4d36-a81a-a8ed9ecfbc4e&pd_rd_i=B0DLPB4CH6&linkCode=ll1&tag=silvamarcos0b-20&linkId=83211a866341d129ee15b7f323ca7db1&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "36",
            "https://www.amazon.com.br/MONITOR-LG-ULTRAWIDE-FULL-26WQ500-B-AWZM/dp/B0BLZFR2H8?pd_rd_i=B0BLZFR2H8&pd_rd_w=pb608&content-id=amzn1.sym.72b93c8a-08ae-4743-bf25-5d8dcc377092&pf_rd_p=72b93c8a-08ae-4743-bf25-5d8dcc377092&pf_rd_r=RRHAHM4698ZMM2RWGVHB&pd_rd_wg=qRt0V&pd_rd_r=888510e2-de52-4d36-a81a-a8ed9ecfbc4e&linkCode=ll1&tag=silvamarcos0b-20&linkId=726a5c2e621e9b8c88c74fc370b23478&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "37",
            "https://www.amazon.com.br/MONITOR-SAMSUNG-ODYSSEY-G30-24/dp/B0BTJ86YFZ?pd_rd_i=B0BTJ86YFZ&pd_rd_w=pb608&content-id=amzn1.sym.72b93c8a-08ae-4743-bf25-5d8dcc377092&pf_rd_p=72b93c8a-08ae-4743-bf25-5d8dcc377092&pf_rd_r=RRHAHM4698ZMM2RWGVHB&pd_rd_wg=qRt0V&pd_rd_r=888510e2-de52-4d36-a81a-a8ed9ecfbc4e&linkCode=ll1&tag=silvamarcos0b-20&linkId=17f590e28bf6a2f75cb3bf16a352a380&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "38",
            "https://www.amazon.com.br/dp/B0DCW6W5BK?psc=1&sp_csd=d2lkZ2V0TmFtZT1zcF9taXNzaW9uX2JsZW5kZWQ&pd_rd_i=B0DCW6W5BK&pd_rd_i=B0DCW6W5BK&pd_rd_w=pb608&content-id=amzn1.sym.72b93c8a-08ae-4743-bf25-5d8dcc377092&pf_rd_p=72b93c8a-08ae-4743-bf25-5d8dcc377092&pf_rd_r=RRHAHM4698ZMM2RWGVHB&pd_rd_wg=qRt0V&pd_rd_r=888510e2-de52-4d36-a81a-a8ed9ecfbc4e&linkCode=ll1&tag=silvamarcos0b-20&linkId=e6b6d2c2042764c0ee49079e485e7545&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "39",
            "https://www.amazon.com.br/dp/B0DCW6W5BK?psc=1&sp_csd=d2lkZ2V0TmFtZT1zcF9taXNzaW9uX2JsZW5kZWQ&pd_rd_i=B0DCW6W5BK&pd_rd_i=B0DCW6W5BK&pd_rd_w=pb608&content-id=amzn1.sym.72b93c8a-08ae-4743-bf25-5d8dcc377092&pf_rd_p=72b93c8a-08ae-4743-bf25-5d8dcc377092&pf_rd_r=RRHAHM4698ZMM2RWGVHB&pd_rd_wg=qRt0V&pd_rd_r=888510e2-de52-4d36-a81a-a8ed9ecfbc4e&linkCode=ll1&tag=silvamarcos0b-20&linkId=e6b6d2c2042764c0ee49079e485e7545&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "40",
            "https://www.amazon.com.br/hz/mobile/mission?p=4O6K2uWlYJQDcVI6uurhSR0OiLCDd24ClrpO%2FPjCwo8cS3FVBgv6rcuBBY8haqFzAzRPjZy3O4keKX7CdKU1j5EB34MGsQa%2FEm%2BASpPPl4cDGgbew%2BxGInTXqVndYCRwNNbTPa8BD%2Fo9zB0lbzQLdF7bC%2BFpt9ubUR4ZoIB6Kzn22FYKYgSnK%2Ftl2PEqNTvNUkhHOLi2tgIENfRAFXRk6JUC3MGytLpA14Ftope8VLrNllU38cZlnBi9tArYgLcfKLRcidbvgBFrvZPzHrW6TClHAH0hUAtG4yhL3Grc75JS%2FC7LBhV%2B1O0VCnRrcnY6YggWsw0%2FoBzjLb1BjVKYYA%2FPJ2TFdTt%2BhGKmR1a%2F%2BAmRPI8rV3C1qzrg1owb8CKOl5oVZxgjqBxF9RgcvKFarw%3D%3D&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pf_rd_p=6f53bf9e-5c03-412c-baa1-2d3a02e01dad&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&pd_rd_w=AWof8&pd_rd_wg=BnOUj&linkCode=ll2&tag=silvamarcos0b-20&linkId=a5c2d904295f352387d557063ef630fb&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "41",
            "https://www.amazon.com.br/CANCELAMENTO-RU%C3%8DDO-HI-RES-W820NB-PLUS/dp/B0BZMLBSYN?_encoding=UTF8&pd_rd_w=t6ost&content-id=amzn1.sym.cde72ad3-5c8a-4a78-bab1-29bf0528245b&pf_rd_p=cde72ad3-5c8a-4a78-bab1-29bf0528245b&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=0edf7697c9823c5a24740b8b8025d3fa&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "42",
            "https://www.amazon.com.br/Monitor-Led-Samsung-Lc27F390Fhlmzd-LC27F390FHLMZD/dp/B079DWDSDW?_encoding=UTF8&pd_rd_w=t6ost&content-id=amzn1.sym.cde72ad3-5c8a-4a78-bab1-29bf0528245b&pf_rd_p=cde72ad3-5c8a-4a78-bab1-29bf0528245b&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&linkCode=ll1&tag=silvamarcos0b-20&linkId=ab8c889e4680701fd146743d0a0a77b0&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "43",
            "https://www.amazon.com.br/SAMSUNG-Monitor-Odyssey-ajuste-Freesync/dp/B0B8F7C61M?_encoding=UTF8&pd_rd_w=t6ost&content-id=amzn1.sym.cde72ad3-5c8a-4a78-bab1-29bf0528245b&pf_rd_p=cde72ad3-5c8a-4a78-bab1-29bf0528245b&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&linkCode=ll1&tag=silvamarcos0b-20&linkId=0c0465b5d4089d34bbd18f745396750b&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "44",
            "https://www.amazon.com.br/Basike-Fotogr%C3%A1fica-Autom%C3%A1tico-Criativos-Resistente/dp/B0FCDKWCWZ?_encoding=UTF8&pd_rd_w=t6ost&content-id=amzn1.sym.cde72ad3-5c8a-4a78-bab1-29bf0528245b&pf_rd_p=cde72ad3-5c8a-4a78-bab1-29bf0528245b&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=ca98a13196c9cafaab50544bf4c539aa&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "45",
            "https://www.amazon.com.br/Logitech-Silencioso-Program%C3%A1veis-Inteligente-Recarreg%C3%A1vel/dp/B0C6K19YBH?_encoding=UTF8&pd_rd_w=vdyfo&content-id=amzn1.sym.8e4d82e3-67d8-4ee1-add4-950ff2dc6154%3Aamzn1.symc.a68f4ca3-28dc-4388-a2cf-24672c480d8f&pf_rd_p=8e4d82e3-67d8-4ee1-add4-950ff2dc6154&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=88979f4e31c6cc7d34e178dc644a6db5&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "46",
            "https://www.amazon.com.br/Logitech-Signature-Easy-Switch-dispositivos-Silenciosa/dp/B0D26V4XJN?_encoding=UTF8&pd_rd_w=vdyfo&content-id=amzn1.sym.8e4d82e3-67d8-4ee1-add4-950ff2dc6154%3Aamzn1.symc.a68f4ca3-28dc-4388-a2cf-24672c480d8f&pf_rd_p=8e4d82e3-67d8-4ee1-add4-950ff2dc6154&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=c9aa0898c5843e397abadda774741e7b&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "47",
            "https://www.amazon.com.br/Logitech-Inteligente-Easy-Switch-dispositivos-Recarreg%C3%A1vel/dp/B09LYZP1LG?_encoding=UTF8&pd_rd_w=vdyfo&content-id=amzn1.sym.8e4d82e3-67d8-4ee1-add4-950ff2dc6154%3Aamzn1.symc.a68f4ca3-28dc-4388-a2cf-24672c480d8f&pf_rd_p=8e4d82e3-67d8-4ee1-add4-950ff2dc6154&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=48142b0b71766c3997c071af55e8c470&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "48",
            "https://www.amazon.com.br/Teclado-Logitech-Conex%C3%A3o-Bluetooth-Easy-Switch/dp/B0CJ3WFW9H?_encoding=UTF8&pd_rd_w=vdyfo&content-id=amzn1.sym.8e4d82e3-67d8-4ee1-add4-950ff2dc6154%3Aamzn1.symc.a68f4ca3-28dc-4388-a2cf-24672c480d8f&pf_rd_p=8e4d82e3-67d8-4ee1-add4-950ff2dc6154&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=638e3cf2a11d87169737957c6d761d6e&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "49",
            "https://www.amazon.com.br/Suporte-Veicular-Tank-Car-Im%C3%A3s/dp/B07DD1JR2R?_encoding=UTF8&pd_rd_w=6lE7H&content-id=amzn1.sym.d08b60d4-ae39-4c07-9796-130b5be7a497&pf_rd_p=d08b60d4-ae39-4c07-9796-130b5be7a497&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&th=1&linkCode=ll1&tag=silvamarcos0b-20&linkId=2cf31dcf0f193cbc64fb257f14bcea72&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "50",
            "https://www.amazon.com.br/Gshield-Necessaire-Organizadora-Divis%C3%B3rias-Acess%C3%B3rios/dp/B0D45VFN78?_encoding=UTF8&pd_rd_w=6lE7H&content-id=amzn1.sym.d08b60d4-ae39-4c07-9796-130b5be7a497&pf_rd_p=d08b60d4-ae39-4c07-9796-130b5be7a497&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&linkCode=ll1&tag=silvamarcos0b-20&linkId=bbc0f9e3d4cb9aa3453095469153727e&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "51",
            "https://www.amazon.com.br/Gshield-Necessaire-Termomoldado-Organizador-Eletr%C3%B4nicos/dp/B0D439ZVGP?_encoding=UTF8&pd_rd_w=6lE7H&content-id=amzn1.sym.d08b60d4-ae39-4c07-9796-130b5be7a497&pf_rd_p=d08b60d4-ae39-4c07-9796-130b5be7a497&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&linkCode=ll1&tag=silvamarcos0b-20&linkId=4cd0c5120582167fae234b2f8485a262&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "52",
            "https://www.amazon.com.br/HyperX-Pulsefire-Mouse-Jogos-Preto/dp/B07H3GFJJ2?_encoding=UTF8&pd_rd_w=6lE7H&content-id=amzn1.sym.d08b60d4-ae39-4c07-9796-130b5be7a497&pf_rd_p=d08b60d4-ae39-4c07-9796-130b5be7a497&pf_rd_r=TB5ZK5WK72THPH28NMZQ&pd_rd_wg=BnOUj&pd_rd_r=86c50398-95cb-4ae0-a36e-89575f80f3a6&linkCode=ll1&tag=silvamarcos0b-20&linkId=0c1b5bce5c017dda008636a7e9e2154c&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        ),
        new LinkProduto(
            "53",
            "https://www.amazon.com.br/KNUT-Hair-Care-Mascara-Brilho/dp/B07GL4RMB4?pd_rd_w=h1s4F&content-id=amzn1.sym.ff6022d3-b108-4f1d-91d1-2ee249739e1d%3Aamzn1.symc.1065d246-0415-4243-928d-c7025bdd9a27&pf_rd_p=ff6022d3-b108-4f1d-91d1-2ee249739e1d&pf_rd_r=HKDGTSQGYC7F7GXE96SM&pd_rd_wg=Ev9D5&pd_rd_r=bd960658-ef9a-4003-82f6-fd5a1136a54e&pd_rd_i=B07GL4RMB4&linkCode=ll1&tag=silvamarcos0b-20&linkId=e381af1e52f5db173e0daa14816126bf&language=pt_BR&ref_=as_li_ss_tl",
            "Amazon"
        )
    ];

    const dataHoje = new Date().toISOString().split('T')[0];
    let produtosExistente: Produto[] = [];

    if (existsSync(outputPath)) {
        const antigo = readFileSync(outputPath, 'utf-8');
        produtosExistente = parseProdutoList(antigo);
    }

    for (const p of LINKS_PRODUTOS_AMAZON) {
        const asin = extrairASIN(p.link);
        const existente = produtosExistente.find(prod => prod.identificador === asin);
        const novoProduto = await extrairProduto(p.id, p.link, p.loja, dataHoje);
        if (!novoProduto) continue;

        if (existente) {
            Object.assign(existente, novoProduto);
        } else {
            produtosExistente.push(novoProduto);
        }

        await delay(2000);
    }

    const blocos = produtosExistente.map(p => `  new Produto(
    "${p.id}",
    "${p.loja}",
    "${p.identificador}",
    ${JSON.stringify(p.titulo)},
    ${JSON.stringify(p.descricao)},
    ${JSON.stringify(p.preco)},
    ${JSON.stringify(p.imagem)},
    ${JSON.stringify(p.link)},
    new Date("${p.dataInclusao.toISOString()}"),
    ${JSON.stringify(p.precoOriginal)},
    ${JSON.stringify(p.desconto)},
    ${JSON.stringify(p.rating)},
    ${JSON.stringify(p.totalAvaliacoes)},
    ${JSON.stringify(p.marca)},
    ${JSON.stringify(p.asin)},
    ${JSON.stringify(p.categorias)},
    ${JSON.stringify(p.features)},
    ${JSON.stringify(p.disponibilidade)},
    ${JSON.stringify(p.entrega)},
    ${JSON.stringify(p.vendedor)},
    ${JSON.stringify(p.ePrime)}
  ),`);

    const conteudo = `import { Produto } from "../../../../../model/produto/produto";

export const PRODUTOS_AMAZON: Produto[] = [
${blocos.join('\n')}
];
`;

    writeFileSync(outputPath, conteudo, { encoding: 'utf-8' });
    console.log('Arquivo produto.ts gerado/atualizado com sucesso!');
})();