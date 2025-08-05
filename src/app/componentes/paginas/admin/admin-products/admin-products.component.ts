import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ProdutoService } from '../../../../../core/services/afiliados-repository/produto-repositoy/produto-repositoy.service';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent implements OnInit {
  displayedColumns = ['titulo', 'loja', 'acoes'];
  dataSource: any[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.produtoService
      .listar({ pagina: 1, limite: 20 } as any)
      .then((obs: any) => obs.subscribe((res: any) => (this.dataSource = res.produtos)));
  }
}
