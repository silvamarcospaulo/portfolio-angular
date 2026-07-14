import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemaDiaNoiteService } from '../../../../core/services/tema-dia-noite/tema-dia-noite.service';

@Component({
  selector: 'app-switch-dia-noite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './switch-dia-noite.component.html',
  styleUrls: ['./switch-dia-noite.component.scss'],
})
export class SwitchDiaNoiteComponent implements OnInit {
  private static nextId = 0;

  darkMode = false;
  readonly switchId = `switch-dia-noite-${SwitchDiaNoiteComponent.nextId++}`;

  constructor(private servicoDeTema: TemaDiaNoiteService) {}

  ngOnInit(): void {
    this.servicoDeTema.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
  }

  aoClicarEmDarkMode(): void {
    this.servicoDeTema.alterarTema();
  }
}
