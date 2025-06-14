import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-flames',
  imports: [
    FormsModule,
  ],
  templateUrl: './flames.component.html',
  standalone: true,
  styleUrl: './flames.component.scss',
})
export class FlamesComponent {
  firstPersonName: string = '';
  secondPersonName: string = '';
  result: string = '';
  resultImg: string = '';
  flames: { [key: string]: { name: string, image: string } } = {
    'F': {
      name: 'FRIEND',
      image: 'flames/Friends.png',
    },
    'L': {
      name: 'LOVE',
      image: 'flames/Love.png',
    },
    'A': {
      name: 'AFFECTION',
      image: 'flames/Affection.png',
    },
    'M': {
      name: 'MARRIAGE',
      image: 'flames/Marriage.png',
    },
    'E': {
      name: 'ENEMY',
      image: 'flames/Enemy.png',
    },
    'S': {
      name: 'SIBLINGS',
      image: 'flames/Siblings.png',
    },
  };

  computeFlames() {
    let name1 = this.firstPersonName.replaceAll(/\W/gi, '').toLowerCase();
    let name2 = this.secondPersonName.replaceAll(/\W/gi, '').toLowerCase();

    if (name1 === '' || name2 === '') {
      alert('Please enter a valid name(s)');
      return;
    }

    for (let ch of name1) {
      if (name2.includes(ch)) {
        name1 = name1.replace(ch, '');
        name2 = name2.replace(ch, '');
      }
    }
    const diff_count = (name1 + name2).length;
    let match = Object.keys(this.flames).join('');
    for (let i = 0; i < 5; i++) {
      let flamesFullList = match.repeat(Math.ceil(diff_count / match.length));
      match = match.split(flamesFullList[diff_count - 1]).reverse().join('');
    }
    this.result = this.flames[match].name;
    this.resultImg = this.flames[match].image;
  }

  resetFields() {
    this.result = '';
    this.firstPersonName = '';
    this.secondPersonName = '';
  }
}
