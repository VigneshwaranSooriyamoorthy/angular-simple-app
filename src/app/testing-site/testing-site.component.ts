import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-testing-site',
  imports: [
    HomeComponent,
  ],
  templateUrl: './testing-site.component.html',
  styleUrl: './testing-site.component.scss',
})
export class TestingSiteComponent {

}
