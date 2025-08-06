import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UniversityService } from '../../../../../core/services/afiliados-repository/university-repository/university.service';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.scss'
})
export class AdminCoursesComponent implements OnInit {
  displayedColumns = ['nome', 'preco', 'acoes'];
  dataSource: any[] = [];

  constructor(private universityService: UniversityService) {}

  ngOnInit() {
    this.universityService.listarCursos().subscribe((res: any[]) => (this.dataSource = res));
  }
}
