import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch-dia-noite',
  templateUrl: './switch-dia-noite.component.html',
  styleUrl: './switch-dia-noite.component.scss'
})
export class SwitchDiaNoiteComponent implements OnInit {
  darkMode: boolean = true;

  ngOnInit() {
    this.darkMode = false;
    this.aoClicarEmDarkMode();
  }

  aoClicarEmDarkMode() {
    debugger;
    this.darkMode = !this.darkMode;
    
    if (this.darkMode) {
      alert('dark-mode');
    } else {
      alert('light-mode');
    }
  }
}