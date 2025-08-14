import { Produto } from "./produto";

describe('Produto', () => {
  it('should create an instance', () => {
    const produto = new Produto(
      '1',
      'loja',
      'identificador',
      'titulo',
      'descricao',
      '10',
      'imagem',
      'link',
      new Date()
    );
    expect(produto).toBeTruthy();
  });
});