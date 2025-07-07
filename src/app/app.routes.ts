import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SimpleCalculatorComponent } from './simple-calculator/simple-calculator.component';
import { TestingSiteComponent } from './testing-site/testing-site.component';
import { FlamesComponent } from './flames/flames.component';
import { DigitalClockComponent } from './digital-clock/digital-clock.component';
import { PlanningPokerComponent } from './planning-poker/planning-poker.component';
import { BuildInProgressComponent } from './util/build-in-progress/build-in-progress.component';
import { AverageMonthlyBalanceComponent } from './average-monthly-balance/average-monthly-balance.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'simple-calculator', component: SimpleCalculatorComponent },
  { path: 'testing-site', component: TestingSiteComponent },
  { path: 'flames', component: FlamesComponent },
  { path: 'digital-clock', component: DigitalClockComponent },
  { path: 'pick-a-menu', component: BuildInProgressComponent },
  { path: 'planning-poker', component: PlanningPokerComponent },
  { path: 'average-monthly-balance', component: AverageMonthlyBalanceComponent },
];
