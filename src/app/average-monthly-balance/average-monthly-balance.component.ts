import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getAverageOfArrayItems, getNaturalNumbers } from '../../../public/util/ArrayUtil';
import { getDaysInMonth, MONTHS } from '../../../public/util/DateTimeUtil';

interface Day {
  day: number;
  amount: number;
}

@Component({
  selector: 'app-average-monthly-balance',
  imports: [
    FormsModule,
  ],
  templateUrl: './average-monthly-balance.component.html',
  standalone: true,
  styleUrl: './average-monthly-balance.component.scss',
})
export class AverageMonthlyBalanceComponent {
  protected readonly MONTHS = MONTHS;
  isNewCalculation: boolean = true;
  date: Date = new Date();
  selectedMonth: string = MONTHS[this.date.getMonth()];
  chosenYear: number = this.date.getUTCFullYear();
  isOpenCalendar: boolean = false;
  days: number[] = [];
  daysClosingBalance: Day[] = [];
  amb: string = '10000';
  closingBalance: string = '';
  isCtrlPressed: boolean = false;
  currentAverageMonthlyBalance: number = 0;

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Control') {
      this.isCtrlPressed = true;
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Control') {
      this.isCtrlPressed = false;
    }
  }

  openCalendar() {
    this.days = getNaturalNumbers(getDaysInMonth(this.chosenYear, MONTHS.indexOf(this.selectedMonth) + 1));
    this.isNewCalculation = false;
    this.isOpenCalendar = true;
  }

  toggleOnHover(target: EventTarget | null): void {
    const dayContainer = target as HTMLElement;
    const dayCheckbox = dayContainer.getElementsByTagName('input').item(0) as HTMLInputElement;
    if (this.isCtrlPressed) {
      dayCheckbox.checked = !dayCheckbox.checked;
    }
  }

  setDayClosureBalance() {
    const $calendarDays = document.querySelectorAll('[id^="calender-day"]');
    $calendarDays.forEach((calendarDay: Element) => {
      const $day = calendarDay.querySelector('div > span') as HTMLElement;
      const $cbDay = calendarDay.querySelector('[id^="day"]') as HTMLInputElement;
      const $dayAmount = calendarDay.querySelector('#closingAmount') as HTMLElement;
      const day: number = Number($day.innerText);
      if ($cbDay.checked) {
        // Remove record if details already present in the array
        this.daysClosingBalance = this.daysClosingBalance.filter((item: Day) => item.day !== day);
        this.daysClosingBalance.push({
          day: Number($day.innerText),
          amount: Number(this.closingBalance),
        });
        $dayAmount.innerText = this.closingBalance;
        $cbDay.checked = false;
      } else if (this.daysClosingBalance.find((item: Day) => item.day === day) === undefined) {
        this.daysClosingBalance.push({
          day: Number($day.innerText),
          amount: 0,
        });
      }
    });
    this.closingBalance = '';
  }

  reset(): void {
    window.location.reload();
  }

  computeAMB() {
    this.currentAverageMonthlyBalance = getAverageOfArrayItems(this.daysClosingBalance.map(day => day.amount));
  }
}
