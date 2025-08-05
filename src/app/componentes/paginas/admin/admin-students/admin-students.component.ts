import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../../core/services/afiliados-repository/user-repository/user.service';

@Component({
  selector: 'app-admin-students',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule],
  templateUrl: './admin-students.component.html',
  styleUrl: './admin-students.component.scss'
})
export class AdminStudentsComponent implements OnInit {
  displayedColumns = ['nome', 'email', 'acoes'];
  dataSource: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.listar().subscribe((res: any[]) => (this.dataSource = res));
  }
}
