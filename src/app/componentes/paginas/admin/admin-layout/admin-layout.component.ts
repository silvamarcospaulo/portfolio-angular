import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../layout/header/header.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatToolbarModule, RouterModule, HeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent { }
