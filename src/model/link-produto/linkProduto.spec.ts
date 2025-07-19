import { LinkProduto } from './linkProduto';

describe('LinkProduto', () => {
  it('should create an instance', () => {
    const link = new LinkProduto(
      1,
      'Amazon',
      'https://www.amazon.com.br/dp/B0CJ3WFW9H'
    );
    expect(link).toBeTruthy();
  });
});