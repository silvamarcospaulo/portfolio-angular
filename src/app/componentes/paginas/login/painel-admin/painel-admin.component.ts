import { Component } from '@angular/core';
import { ProdutoService } from '../../../../../core/services/afiliados-repository/produto-repositoy/produto-repositoy.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-painel-admin',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './painel-admin.component.html',
  styleUrl: './painel-admin.component.scss'
})
export class PainelAdminComponent {
  url = '';
  loja = '';
  links: { url: string; loja: string }[] = [];
  mensagem = '';

  lojasDisponiveis = ['Amazon', 'AliExpress', 'Shopee', 'Mercado Livre'];

  constructor(private produtoService: ProdutoService) { }

  adicionarLink() {
    if (!this.url || !this.loja) return;

    this.links.push({ url: this.url, loja: this.loja });
    this.url = '';
    this.loja = '';
  }

  async submeter() {
    if (this.links.length === 0) return;

    (await this.produtoService.criarLote(this.links)).subscribe({
      next: (res: any) => {
        this.mensagem = `Links enviados com sucesso!`;
        this.links = [];
      },
      error: (err) => {
        console.error(err);
        this.mensagem = 'Erro ao enviar links.';
      }
    });
  }
}