import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../../../core/services/seo/seo.service';
import { TranslateModule } from '@ngx-translate/core';
import { CardComponent } from './card/card.component';
import { FooterComponent } from '../../reutilizaveis/footer/footer.component';
import { HeaderComponent } from '../../reutilizaveis/header/header.component';
import { Card, Link } from '../../../../model/link.model';
import { CardDropdownComponent } from "./dropdown/card-dropdown.component";

@Component({
  selector: 'app-meus-links',
  standalone: true,
  imports: [TranslateModule, CardComponent, FooterComponent, HeaderComponent, CardDropdownComponent],
  templateUrl: './meus-links.component.html',
  styleUrls: ['./meus-links.component.scss']
})
export class MeusLinksComponent implements OnInit {
  links: Card[] = [];

  constructor(private seoService: SeoService) { }

  ngOnInit(): void {
    this.links = [
      new Card({
        card: new Link({
          nome: "LinkedIn",
          url: "https://linkedin.com/in/silvamarcospaulo",
          icone: "bi bi-linkedin"
        })
      }),

      new Card({
        card: new Link({
          nome: "Teste",
          url: "https://linkedin.com/in/silvamarcospaulo",
          imagem: "/assets/images/print-projetos/lsgblackfriday.png"
        })
      }),

      new Card({
        card: new Link({
          nome: "GitHub",
          url: "https://github.com/silvamarcospaulo",
          icone: "bi bi-github"
        })
      }),

      new Card({
        card: new Link({
          nome: "Contato",
          url: "mailto:silvampsmarcospaulo@gmail.com",
          icone: "bi bi-envelope-fill"
        })
      }),

      new Card({
        card: new Link({
          nome: "Instagram",
          url: "https://instagram.com/marcospaulo.dev",
          icone: "bi bi-instagram"
        })
      }),

      new Card({
        nome: 'lojas',
        imagem: "/assets/images/print-projetos/lsgblackfriday.png",
        dropdown: [
          new Link({
            nome: "Shopee",
            url: "https://shopee.com",
            icone: "bi bi-bag-fill"
          }),
          new Link({
            nome: "Teste",
            url: "https://linkedin.com/in/silvamarcospaulo",
            imagem: "/assets/images/print-projetos/lsgblackfriday.png"
          }),
          new Link({
            nome: "Amazon",
            url: "https://amazon.com",
            icone: "bi bi-cart-fill"
          }),
          new Link({
            nome: "Mercado Livre",
            url: "https://mercadolivre.com",
            icone: "bi bi-box-seam"
          })
        ]
      })
    ];

    this.seoService.atualizarMetadados({
      title: 'Links Úteis - Marcos Paulo Silva',
      description: 'Acesse meus principais links: Instagram, LinkedIn, GitHub e mais.',
      image: 'https://www.marcospaulosilva.com.br/assets/images/logo.png',
      url: 'https://www.marcospaulosilva.com.br/links-uteis'
    });
  }
}