import crypto from 'crypto';
import { ProdutoAfiliadoAmazon } from '../../model/produto-afiliado-amazon.model';

export class AmazonPaApiService {
  private host = 'webservices.amazon.com';
  private region = 'us-east-1';
  private service = 'ProductAdvertisingAPI';

  private accessKey = process.env['CHAVE_DE_ACESSO'] || '';
  private secretKey = process.env['CHAVE_SECRETA'] || '';
  private tag = process.env['TAG_AFILIADO'] || '';

  async buscarProdutos(palavra: string): Promise<ProdutoAfiliadoAmazon[]> {
    const payload = JSON.stringify({
      Keywords: palavra,
      PartnerTag: this.tag,
      PartnerType: 'Associates',
      Resources: [
        'Images.Primary.Large',
        'ItemInfo.Title',
        'Offers.Listings.Price'
      ]
    });

    const headers = this.assinarRequisicao('/paapi5/searchitems', payload);

    const resposta = await fetch(`https://${this.host}/paapi5/searchitems`, {
      method: 'POST',
      headers,
      body: payload
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao consultar PA API: ${resposta.status} ${resposta.statusText}`);
    }

    const dados = await resposta.json();
    return this.converterResposta(dados);
  }

  private converterResposta(dados: any): ProdutoAfiliadoAmazon[] {
    const itens = dados.SearchResult?.Items || [];
    return itens.map((item: any) => ({
      nome: item.ItemInfo?.Title?.DisplayValue || '',
      imagem: item.Images?.Primary?.Large?.URL || '',
      preco: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || '',
      link: item.DetailPageURL || ''
    }));
  }

  private assinarRequisicao(caminho: string, corpo: string): Record<string, string> {
    const alvo = 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems';
    const tipoConteudo = 'application/json; charset=UTF-8';
    const codificacao = 'amz-1.0';

    const agora = new Date();
    const amzDate = agora.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);

    const headers: Record<string, string> = {
      'content-encoding': codificacao,
      'content-type': tipoConteudo,
      host: this.host,
      'x-amz-date': amzDate,
      'x-amz-target': alvo
    };

    const signedHeaders = Object.keys(headers)
      .map(h => h.toLowerCase())
      .sort()
      .join(';');
    const canonicalHeaders = Object.keys(headers)
      .map(h => `${h.toLowerCase()}:${headers[h]}`)
      .sort()
      .join('\n');

    const hashedPayload = crypto.createHash('sha256').update(corpo, 'utf8').digest('hex');

    const canonicalRequest = [
      'POST',
      caminho,
      '',
      canonicalHeaders + '\n',
      signedHeaders,
      hashedPayload
    ].join('\n');

    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${dateStamp}/${this.region}/${this.service}/aws4_request`;
    const stringToSign = [
      algorithm,
      amzDate,
      credentialScope,
      crypto.createHash('sha256').update(canonicalRequest, 'utf8').digest('hex')
    ].join('\n');

    const signingKey = this.getSignatureKey(this.secretKey, dateStamp, this.region, this.service);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign, 'utf8').digest('hex');

    const authorization = `${algorithm} Credential=${this.accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    return {
      ...headers,
      Authorization: authorization
    };
  }

  private getSignatureKey(key: string, dateStamp: string, regionName: string, serviceName: string) {
    const kDate = crypto.createHmac('sha256', 'AWS4' + key).update(dateStamp).digest();
    const kRegion = crypto.createHmac('sha256', kDate).update(regionName).digest();
    const kService = crypto.createHmac('sha256', kRegion).update(serviceName).digest();
    return crypto.createHmac('sha256', kService).update('aws4_request').digest();
  }
}
