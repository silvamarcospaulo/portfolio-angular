import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-timeline',
  imports: [NgClass],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})

export class TimelineComponent {
  events = [
    {
      year: 'Mai 2024 – Out 2024',
      empresa: "Invent Software",
      occupation: 'Estagiário em Engenharia de Software',
      details: [
        'Desenvolvimento de aplicações em C# WindowsForms e web com SAPUI5',
        'Onion Architecture',
        'xUnit',
        'Linq2DB',
        'SQL Server',
        'FluentMigrator',
        'FluentValidation'
      ]
    },
    {
      year: 'Nov 2024 – Atual',
      empresa: "Invent Software",
      occupation: 'Técnico em Desenvolvimento de Software',
      details: [
        'Desenvolvimento fullstack C# e SAPUI5',
        'Onion Architecture',
        'xUnit',
        'OPA5',
        'RavenDB'
      ]
    },
    {
      year: 'Set 2025 – Atual',
      empresa: "Invent Software",
      occupation: 'Analista I em Desenvolvimento de Software',
      details: [
        'Desenvolvimento fullstack C# e SAPUI5',
        'Onion Architecture',
        'xUnit',
        'OPA5',
        'RavenDB'
      ]
    }
  ];
}