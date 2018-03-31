import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items:any[] = [
    ['Bluetooth Images', '/'], 
    ['About', '/about'],
    // ['Settings', '/settings']
  ]
  title = 'app';
}
