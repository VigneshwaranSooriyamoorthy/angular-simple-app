import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getNaturalNumbers } from '../../../public/util/ArrayUtil';
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
  date: Date = new Date();
  selectedMonth: string = MONTHS[this.date.getMonth()];
  chosenYear: number = this.date.getUTCFullYear();
  isOpenCalendar: boolean = false;
  days: number[] = [];
  daysClosingBalance: Day[] = [];
  amb: string = '';
  closingBalance: string = '';
  isCtrlPressed: boolean = false;

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
      const $dayAmount = calendarDay.querySelector('span[name="closingAmount"]') as HTMLElement;
      if ($cbDay.checked) {
        const day: number = Number($day.innerText);
        // Remove record if details already present in the array
        this.daysClosingBalance = this.daysClosingBalance.filter((item: Day) => item.day !== day);
        this.daysClosingBalance.push({
          day: Number($day.innerText),
          amount: Number(this.closingBalance),
        });
        $dayAmount.innerText = this.closingBalance;
        $cbDay.checked = false;
      }
    });
  }

  reset(): void {
    window.location.reload();
  }

  protected readonly MONTHS = MONTHS;
}
