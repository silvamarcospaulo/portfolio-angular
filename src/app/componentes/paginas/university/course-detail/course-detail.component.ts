import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../../../layout/header/header.component';
import { UniversityService } from '../../../../../core/services/afiliados-repository/university-repository/university.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatListModule, MatButtonModule, HeaderComponent],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {
  curso: any;
  moduloAtual = 0;

  constructor(
    private route: ActivatedRoute,
    private universityService: UniversityService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.universityService.obterCurso(id).subscribe(res => {
      this.curso = res;
    });
  }

  selecionarModulo(i: number) {
    this.moduloAtual = i;
  }

  anterior() {
    if (this.moduloAtual > 0) {
      this.moduloAtual--;
    }
  }

  proximo() {
    if (this.curso && this.moduloAtual < this.curso.modulos.length - 1) {
      this.moduloAtual++;
    }
  }
}
