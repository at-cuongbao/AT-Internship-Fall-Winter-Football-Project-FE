import { Component, ElementRef, ViewChild, Renderer } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { Team } from 'src/app/shared/models/team';
import { TournamentService } from 'src/app/shared/services/tournament.service';
import { FormControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-tournament-registration',
  templateUrl: './tournament-registration.component.html',
  styleUrls: ['./tournament-registration.component.scss']
})
export class TournamentRegistrationComponent {
  @ViewChild("modal", { read: ElementRef }) modal: ElementRef;
  @ViewChild("f", { read: ElementRef }) modalForm: ElementRef;

  imageUrl = '../../../assets/images/default-image.png';
  imageLogo = '';
  imageCover = '';

  teams: Team[] = [];

  groups = [];
  tables = ["A", "B", "C", "D", "E", "F", "H", "G"];

  constructor(
    private tournamentService: TournamentService,
    private renderer: Renderer
  ) { }

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
        name: f.control.value.name,
        start_at: f.control.value.start,
        end_at: f.control.value.finish,
        group_number: this.groups.length,
        desc: f.control.value.des
      },
      teams: this.teams
    };
    this.tournamentService.tournamentRegistration(data);
  }

  onModalSubmit(modalForm: NgForm) {
    let index = +this.modal.nativeElement.getAttribute('id');

    let team = new Team();
    team.name = modalForm.control.value.name;
    team.code = modalForm.control.value.code;
    team.cover = this.imageCover ? this.imageCover : this.imageUrl;
    team.logo = this.imageLogo ? this.imageLogo : this.imageUrl;
    this.teams[index] = team;

    this.resetForm();
    this.closeModal();
  }

  openModal(index) {
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
