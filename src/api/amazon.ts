import aws4 from 'aws4';
import https from 'node:https';

export interface ProdutoAmazonAPI {
  nome: string;
  imagem: string;
  preco: string;
  link: string;
}

const host = 'webservices.amazon.com.br';
const region = 'us-east-1';
const path = '/paapi5/searchitems';
const service = 'ProductAdvertisingAPI';

export function buscarNaAmazon(palavra: string): Promise<ProdutoAmazonAPI[]> {
  const corpo = JSON.stringify({
    Keywords: palavra,
    Resources: [
      'ItemInfo.Title',
      'Images.Primary.Medium',
      'Offers.Listings.Price'
    ],
    PartnerTag: process.env.TAG_AFILIADO,
    PartnerType: 'Associates',
    Marketplace: 'www.amazon.com.br'
  });

  const opcoes: aws4.Request = {
    host,
    method: 'POST',
    path,
    service,
    region,
    body: corpo,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  } as any;

  aws4.sign(opcoes, {
    accessKeyId: process.env.CHAVE_DE_ACESSO || '',
    secretAccessKey: process.env.CHAVE_SECRETA || ''
  });

  return new Promise((resolve, reject) => {
    const req = https.request(opcoes, res => {
      let dados = '';
      res.on('data', d => (dados += d));
      res.on('end', () => {
        try {
          const json = JSON.parse(dados);
          const itens = json.SearchResult?.Items || [];
          const produtos: ProdutoAmazonAPI[] = itens.map((i: any) => ({
            nome: i.ItemInfo?.Title?.DisplayValue,
            imagem: i.Images?.Primary?.Medium?.URL,
            preco: i.Offers?.Listings?.[0]?.Price?.DisplayAmount,
            link: i.DetailPageURL
          }));
          resolve(produtos);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.write(corpo);
    req.end();
  });
}
