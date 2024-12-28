import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from '@angular/forms';
import {buttonType, DialogComponent} from '../util/dialog/dialog.component';

@Component({
  selector: 'app-home',
  imports: [
    NgForOf,
    FormsModule,
    DialogComponent,
    NgIf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  apps = [
    {
      'name': 'Simple Calculator',
      'icon': 'calculate',
      'url': 'simple-calculator',
    },
    {
      'name': 'Testing Site',
      'icon': 'app_registration',
      'url': 'testing-site'
    },
    {
      'name': 'Tell a joke',
      'icon': 'theater_comedy',
      'url': ''
    },
    {
      'name': 'FLAMES',
      'icon': 'favorite',
      'url': 'flames'
    }
  ];
  openDialog: boolean = false;
  joke: string = '';
  protected readonly buttonType = buttonType;

  getJoke() {
    fetch('https://v2.jokeapi.dev/joke/Any?safe-mode')
      .then(response => {
        if (response.ok) {
          response.json().then(data => {
            if (data.type === 'single') {
              this.joke = data.joke;
            } else {
              this.joke = `- ${data.setup}<br>- ${data.delivery}`;
            }
          })
        } else {
          alert('Joke API not working')
        }
      })
  }

  openApp(url: string) {
    if (url === '') {
      this.getJoke();
      this.openDialog = true;
    } else {
      window.open(url, '_self');
    }
  }

  processDialogEvent($event: boolean) {
    if ($event) {
      this.getJoke();
    } else {
      this.joke = '';
      this.openDialog = false;
    }
  }

}
