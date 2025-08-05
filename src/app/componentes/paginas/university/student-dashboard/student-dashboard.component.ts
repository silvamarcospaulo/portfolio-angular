import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { UniversityService } from '../../../../../core/services/afiliados-repository/university-repository/university.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent implements OnInit {
  cursos: any[] = [];

  constructor(private universityService: UniversityService) { }

  ngOnInit() {
    this.universityService.listarCursos().subscribe(res => this.cursos = res);
  }
}
