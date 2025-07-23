import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownIdiomasComponent } from "../../../reutilizaveis/dropdown-idiomas/dropdown-idiomas.component";
import { SwitchDiaNoiteComponent } from "../../../reutilizaveis/switch-dia-noite/switch-dia-noite.component";
import { FormsModule } from '@angular/forms';
import { Link } from '../../../../../model/link.model';
import { FiltroProduto } from '../../../../../model/filtro-produto/filtro-produto';

@Component({
  standalone: true,
  selector: 'app-promocoes-header',
  imports: [TranslateModule, DropdownIdiomasComponent, SwitchDiaNoiteComponent, CommonModule, FormsModule],
  templateUrl: './promocoes-header.component.html',
  styleUrl: './promocoes-header.component.scss'
})
export class PromocoesHeaderComponent {
  @Input() links: Link[] = [];
  @Input() filtros!: FiltroProduto;
  @Input() mostrarSidebar = false;
  @Input() marcas: string[] = [];

  @Output() filtrosChange = new EventEmitter<FiltroProduto>();

  menuAberto = false;

  fecharMenu() {
    this.menuAberto = false;
  }

  headerTranslucido = false;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = (): void => {
    this.headerTranslucido = window.scrollY > 20;
  };

  aplicarFiltros() {
    this.filtrosChange.emit(this.filtros);
  }
}