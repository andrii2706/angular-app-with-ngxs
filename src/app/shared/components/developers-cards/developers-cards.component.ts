import { Component, computed, input, output } from '@angular/core';
import { Developers } from '../../models/developers.interface';

@Component({
  selector: 'app-developers-cards',
  imports: [],
  templateUrl: './developers-cards.component.html',
  styleUrl: './developers-cards.component.scss',
  standalone: true,
})
export class DevelopersCardsComponent {
  developers = input<Developers>();
  skeleton = input<boolean>();
}
