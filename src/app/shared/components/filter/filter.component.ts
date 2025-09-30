import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-filter',
  imports: [LucideAngularModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  standalone: true
})
export class FilterComponent {}
