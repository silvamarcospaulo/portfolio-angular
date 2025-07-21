import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemaDiaNoiteService } from '../../../../core/services/tema-dia-noite/tema-dia-noite.service';

@Component({
  selector: 'app-switch-dia-noite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './switch-dia-noite.component.html',
  styleUrls: ['./switch-dia-noite.component.scss']
})
export class SwitchDiaNoiteComponent implements OnInit {
  darkMode = false;

  constructor(private _servicoDeTema: TemaDiaNoiteService) { }

  ngOnInit() {
    this._servicoDeTema.darkMode$.subscribe(mode => {
      this.darkMode = mode;
    });
  }

  aoClicarEmDarkMode() {
    this._servicoDeTema.alterarTema();
  }
}