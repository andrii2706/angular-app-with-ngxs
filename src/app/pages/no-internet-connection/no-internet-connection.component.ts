import { Component } from '@angular/core';

@Component({
  selector: 'app-no-internet-connection',
  imports: [],
  templateUrl: './no-internet-connection.component.html',
  styleUrl: './no-internet-connection.component.scss',
})
export class NoInternetConnectionComponent {
  redirectToPreviousPage() {
    history.back();
  }
}
