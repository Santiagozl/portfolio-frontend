import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { Skill } from '../../core/models';
import { RevealDirective } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [AsyncPipe, RevealDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  private readonly dataService = inject(PortfolioDataService);

  readonly skillsByCategory$ = this.dataService.getSkills().pipe(
    map((skills) => this.groupByCategory(skills))
  );

  private groupByCategory(skills: Skill[]): { category: string; skills: Skill[] }[] {
    const groups = new Map<string, Skill[]>();

    for (const skill of skills) {
      const group = groups.get(skill.category) ?? [];
      group.push(skill);
      groups.set(skill.category, group);
    }

    return Array.from(groups.entries()).map(([category, skills]) => ({ category, skills }));
  }
}
