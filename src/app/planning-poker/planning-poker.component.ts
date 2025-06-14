import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { filter, mergeMap, take, timer } from 'rxjs';
import { Router } from '@angular/router';

interface members {
  teamName: string;
  teamMembers: string[];
}

interface Estimation {
  name: string;
  estimation: string;
}

interface data {
  members: members[],
  scrumMaster: string,
  estimations: Estimation[];
  revealEstimations: boolean;
}

@Component({
  selector: 'app-planning-poker',
  imports: [
    FormsModule,
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
  scrumMaster: string = '';
  isScrumMaster: boolean = false;
  userDetails: boolean = true;
  estimations: Estimation[] = [];
  isRevealEstimations: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.router.url.includes('github.io')) {
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
          return this.isScrumMaster && this.isRevealEstimations;
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

    if (this.username === this.scrumMaster) {
      this.isScrumMaster = true;
    }

    // Hide the estimations until SM reveal
    this.isRevealEstimations = false;

    // Hide user details section
    this.userDetails = false;

    // Update the SM
    this.getBlob()
      .then((response: data) => {
        response.scrumMaster = this.isScrumMaster ? this.username : '';
        this.putBlob(response).then();
      });

    // Poll for estimation
    this.pollBlob();
  }

  updateStoryPoint(selectedStoryPoint: string) {
    // Fetch the current estimation from the Team
    this.getBlob()
      .then(data => {
        // Remove the estimation already made by the user
        let revisedEstimation: Estimation[] = data
          .estimations
          .filter((estimation: Estimation) => estimation.name !== this.username);
        // Preserve the Team's estimation
        revisedEstimation.push({
          name: this.username,
          estimation: `${selectedStoryPoint}`,
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
      .then(data => {
        this.estimations = [];
        data.estimations = [];
        data.revealEstimations = false;
        this.putBlob(data).then();
      }).then(() => {
      // Poll for estimation
      this.pollBlob();
    });
  }

  revealEstimations() {
    this.getBlob()
      .then(data => {
        data.revealEstimations = true;
        this.putBlob(data).then();
      });
  }
}
