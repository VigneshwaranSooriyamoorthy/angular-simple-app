import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filter, mergeMap, take, timer } from 'rxjs';
import { buttonType, DialogComponent } from '../util/dialog/dialog.component';
import { getAverageOfArrayItems } from '../../../public/util/ArrayUtil';

interface members {
  teamName: string;
  teamMembers: string[];
}

interface Estimation {
  estimatedBy: string;
  storyPoint: string;
}

interface data {
  members: members[],
  scrumMaster: string,
  estimations: Estimation[];
  ticketName: string;
  revealEstimations: boolean;
  nearestSPAboveEstAvg: number;
}

@Component({
  selector: 'app-planning-poker',
  imports: [
    FormsModule,
    DialogComponent,
  ],
  templateUrl: './planning-poker.component.html',
  styleUrl: './planning-poker.component.scss',
})
export class PlanningPokerComponent implements OnInit {

  blob: string = 'https://jsonblob.com/api/jsonBlob/1376627307548172288';
  storyPoints: string[] = ['1', '2', '3', '5', '8', '13', '21', '34', '☕️', '🤷'];
  instructions: string[] = [
    'Select your <b>TEAM</b>, based on which, <b>NAME</b> will be updated',
    'Select your <b>NAME</b>',
    'Select the optional Checkbox if required',
    'Press <b>ENTER</b>',
  ];
  teams: string[] = [];
  members: members[] = [];
  currentTeamMembers: string[] = [];
  currentTeam: string = '';
  username: string = '';
  isNameDisabled: boolean = true;
  scrumMaster: string = '';
  isScrumMaster: boolean = false;
  userDetails: boolean = true;
  estimations: Estimation[] = [];
  ticketName: string = '';
  protected readonly buttonType = buttonType;
  openDialog: boolean = false;
  isRevealEstimations: boolean = false;
  nearestStoryPointAboveAverage: number = 0;

  ngOnInit() {
    if (window.location.href.includes('github.io')) {
      document.getElementsByTagName('header')[0].remove();
    }
    fetch(this.blob)
      .then(res => res.json())
      .then((response: data) => {
        this.members = response.members;
        response.members.map(member => this.teams.push(member.teamName));
      });
  }

  updateCurrentTeamMembers() {
    this.currentTeamMembers = this.members
      .filter(member => member.teamName === this.currentTeam)[0]
      .teamMembers;
    this.isNameDisabled = false;
    this.scrumMaster = this.members
      .filter(team => team.teamName === this.currentTeam)[0]
      .teamMembers
      .filter(member => member.includes('SM'))[0];
  }

  async getBlob() {
    const res = await fetch(this.blob);
    return await res.json();
  }

  async putBlob(blob: data) {
    const res = await fetch(this.blob, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blob),
    });
    if (res.status !== 200) {
      alert('Server down! Please try after sometime.');
    }
  }

  pollBlob() {
    timer(0, 1000)
      .pipe(
        mergeMap(() => this.getBlob()),
        filter((response: data) => {
          this.isRevealEstimations = response.revealEstimations;
          this.estimations = response.estimations;
          this.nearestStoryPointAboveAverage = response.nearestSPAboveEstAvg;
          this.ticketName = response.ticketName;
          if (this.ticketName === '') {
            this.userDetails = true;
          }
          // return true will stop polling
          if (this.isScrumMaster) {
            return response.revealEstimations || response.ticketName === '';
          } else {
            if (this.ticketName === '') {
              this.openDialog = true;
            }
            return this.ticketName === '';
          }
        }),
        take(1),
      ).subscribe(() => {
    });
  }

  enterRoom() {
    if (this.currentTeam === '') {
      alert('Please select a team');
      return;
    }
    if (this.username === '') {
      alert('Please enter a username');
      return;
    }
    if (this.isScrumMaster && this.ticketName === '') {
      alert('Please enter a ticket name');
      return;
    }

    // Hide the estimations until SM reveal
    this.isRevealEstimations = false;

    // Hide user details section
    this.userDetails = false;

    // Update the SM
    this.getBlob()
      .then((response: data) => {
        response.scrumMaster = this.isScrumMaster ? this.username : '';
        response.revealEstimations = false;
        if (this.isScrumMaster) {
          response.ticketName = this.ticketName;
        }
        this.putBlob(response).then();
      }).then(() => {
      // Poll for estimation
      this.pollBlob();
    });
  }

  updateStoryPoint(selectedStoryPoint: string) {
    // Fetch the current estimation from the Team
    this.getBlob()
      .then(data => {
        // Remove the estimation already made by the user
        let revisedEstimation: Estimation[] = data
          .estimations
          .filter((estimation: Estimation) => estimation.estimatedBy !== this.username);
        // Preserve the Team's estimation
        revisedEstimation.push({
          estimatedBy: this.username,
          storyPoint: `${selectedStoryPoint}`,
        });
        // Push the new estimation from the user
        data.estimations = revisedEstimation;
        this.estimations = revisedEstimation;
        // POST the new estimation
        this.putBlob(data).then();
      });
  }

  resetEstimations() {
    this.getBlob()
      .then((response: data) => {
        this.estimations = [];
        response.estimations = [];
        response.revealEstimations = false;
        this.putBlob(response).then();
      }).then(() => {
      // Poll for estimation
      this.pollBlob();
    });
  }

  revealEstimations() {
    this.getBlob()
      .then((response: data) => {
        // Nearest Fibonacci number for the average estimation
        const estimationAverage = getAverageOfArrayItems(
          response
            .estimations
            .map(
              estimation =>
                isNaN(Number(estimation.storyPoint)) ? 0 : Number(estimation.storyPoint),
            ),
        );
        this.storyPoints.some((storyPoint: string) => {
          const numStoryPoint = Number(storyPoint);
          if (numStoryPoint >= estimationAverage) {
            this.nearestStoryPointAboveAverage = numStoryPoint;
            return true;
          }
          return false;
        });
        response.revealEstimations = true;
        response.nearestSPAboveEstAvg = this.nearestStoryPointAboveAverage;
        this.putBlob(response).then();
      });
  }

  newEstimation() {
    this.getBlob()
      .then((response: data) => {
        response.ticketName = '';
        this.estimations = [];
        response.estimations = [];
        this.putBlob(response).then();
      });
    this.userDetails = true;
    this.ticketName = '';
  }

  processDialogEvent($event: boolean) {
    // Dialog emit false for the primary button click, as the functionality is expected to close the dialog
    if ($event) {
      alert('Something went wrong, try again after sometime');
    } else {
      this.openDialog = false;
    }
  }
}
