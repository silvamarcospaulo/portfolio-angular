import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../layout/header/header.component';
import { UniversityService } from '../../../../core/services/afiliados-repository/university-repository/university.service';

@Component({
  selector: 'app-university',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, HeaderComponent],
  templateUrl: './university.component.html',
  styleUrl: './university.component.scss'
})
export class UniversityComponent implements OnInit {
  cursos: any[] = [];

  constructor(private universityService: UniversityService) { }

  ngOnInit() {
    this.universityService.listarCursos().subscribe(res => this.cursos = res);
  }
}
