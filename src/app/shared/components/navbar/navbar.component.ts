import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
})
export class NavbarComponent {
  showMenuClick: boolean = false;
  showFilterProp: boolean = true;

  showFilter() {
    this.showFilterProp = !this.showFilterProp;
  }

  showMenuMethod() {
    this.showMenuClick = !this.showMenuClick;
  }
}
