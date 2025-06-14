import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgClass } from '@angular/common';
import { map, shareReplay, timer } from 'rxjs';

@Component({
  selector: 'app-digital-clock',
  imports: [
    NgClass,
    AsyncPipe,
    DecimalPipe,
  ],
  templateUrl: './digital-clock.component.html',
  styleUrl: './digital-clock.component.scss',
  standalone: true,
})
export class DigitalClockComponent implements OnInit, OnDestroy {

  dateTime = timer(0, 1000)
    .pipe(
      map(_ => new Date()),
      shareReplay(1),
    );

  day$ = this.dateTime.pipe(map(now => now.getDay()));
  hour$ = this.dateTime.pipe(map(now => now.getHours() % 12 || 12));
  minute$ = this.dateTime.pipe(map(now => now.getMinutes()));
  second$ = this.dateTime.pipe(map(now => now.getSeconds()));
  am_pm$ = this.dateTime.pipe(map(now => now.getHours() < 12 ? 'AM' : 'PM'));

  visible = true;
  timer: any;

  ngOnInit() {
    this.timer = setInterval(() => {
      document.getElementsByClassName('time-separator').item(0)?.setAttribute('style', `visibility: ${this.visible ? 'visible' : 'hidden'}`);
      this.visible = !this.visible;
    }, 500);
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

}
