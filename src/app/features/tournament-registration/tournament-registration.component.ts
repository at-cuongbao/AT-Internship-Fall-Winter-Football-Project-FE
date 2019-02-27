import { Component, ElementRef, ViewChild, Renderer, DoCheck, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Team } from 'src/app/shared/models/team';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { Router } from '@angular/router';
import { initDomAdapter } from '@angular/platform-browser/src/browser';

@Component({
  selector: 'app-tournament-registration',
  templateUrl: './tournament-registration.component.html',
  styleUrls: ['./tournament-registration.component.scss']
})
export class TournamentRegistrationComponent implements OnInit, DoCheck {
  @ViewChild("modal", { read: ElementRef }) modal: ElementRef;
  @ViewChild("f", { read: ElementRef }) modalForm: ElementRef;
  
  imageSource = '../../../assets/images/anhbongda.jpg';
  imageUrl = '../../../assets/images/default-image.png';
  imageLogo = '';
  imageCover = '';

  teams: Team[] = [];
  isSubmited = false;
  teamName = '';
  teamCode = '';

  groups = [];
  tables = ["A", "B", "C", "D", "E", "F", "G", "H"];

  constructor(
    private apiService: ApiService,
    private renderer: Renderer,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.initTeam();
  }

  initTeam() {
    this.tables.map(tables => {
      for (let i = 0; i < 32; i++) {
        let team = new Team();
        team.name = "Name Team " + (i + 1);
        team.code = "Code Team " + (i + 1);
        team.cover = this.imageUrl;
        team.logo = this.imageUrl;
        this.teams[i] = team;
      }
    });
  }

  ngDoCheck(): void {
  }

  handleFileInput(file: FileList, isForLogo = true) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      if (isForLogo) {
        this.imageLogo = event.target.result;
      } else {
        this.imageCover = event.target.result;
      }
    }
    reader.readAsDataURL(file.item(0));
  }

  convert(number) {
    this.groups = [];
    for (let i = 0; i < number.value; i++) {
      this.groups.push(i);
    }
  }

  onSubmit(f: NgForm) {
    let data = {
      tournament: {
        name: f.control.value.tournamentName,
        start_at: f.control.value.start,
        group_number: this.groups.length,
        desc: f.control.value.infor
      },
      teams: this.teams
    };
    console.log(f.control.value.start);
    this.apiService.post([END_POINT.tournaments], data).subscribe(tournamentId => {
      this.router.navigate(['schedules', tournamentId]);
    });
  }

  onModalSubmit(modalForm: NgForm) {
    let index = +this.modal.nativeElement.getAttribute('id');
    let team = new Team();
    team.name = modalForm.control.value.name;
    team.code = modalForm.control.value.code;
    team.cover = modalForm.control.value.cover ? "../../../assets/images/" + modalForm.control.value.cover.slice(12) : this.imageUrl;
    team.logo = modalForm.control.value.logo ? "../../../assets/images/" + modalForm.control.value.logo.slice(12) : this.imageUrl;
    this.teams[index] = team;

    this.resetForm();
    this.closeModal();
  }

  openModal(index) {
    this.resetForm();
    if (this.teams[index]) {
      this.teamName = this.teams[index].name;
      this.teamCode = this.teams[index].code;
      this.imageCover = this.teams[index].cover;
      this.imageLogo = this.teams[index].logo;
    }
    this.renderer.setElementAttribute(this.modal.nativeElement, "style", "display: block");
    this.renderer.setElementAttribute(this.modal.nativeElement, "id", `${index}`);
  }

  closeModal() {
    this.renderer.setElementAttribute(this.modal.nativeElement, "style", "display: none");
  }

  resetForm() {
    this.modalForm.nativeElement.reset()
    this.imageCover = this.imageLogo = this.imageUrl;
  }
}
