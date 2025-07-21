import { Produto } from "./produto";

describe('Produto', () => {
  it('should create an instance', () => {
    const produto = new Produto(
      '1',
      'Loja',
      'ID',
      'Titulo',
      'Descricao',
      '10',
      'imagem.jpg',
      'link',
      new Date()
    );
    expect(produto).toBeTruthy();
  });
});