import { Component, ElementRef, ViewChild, Renderer, DoCheck } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Team } from 'src/app/shared/models/team';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from 'src/app/shared/services/api-registry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tournament-registration',
  templateUrl: './tournament-registration.component.html',
  styleUrls: ['./tournament-registration.component.scss']
})
export class TournamentRegistrationComponent implements DoCheck {
  @ViewChild("modal", { read: ElementRef }) modal: ElementRef;
  @ViewChild("f", { read: ElementRef }) modalForm: ElementRef;

  imageSource = '../../../assets/images/anhbongda.jpg';
  imageUrl = '../../../assets/images/default-image.png';
  imageLogo = '';
  imageCover = '';

  teams: Team[] = [];
  isSubmited = false;

  groups = [];
  tables = ["A", "B", "C", "D", "E", "F", "H", "G"];

  constructor(
    private apiService: ApiService,
    private renderer: Renderer,
    private router: Router
  ) {}

  ngDoCheck(): void {
    this.isSubmited = this.teams.length === 16 ? true : false;
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
        end_at: f.control.value.finish,
        group_number: this.groups.length,
        desc: f.control.value.infor
      },
      teams: this.teams
    };
    const dataTemp = {
      teams: [
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" },
        { name: "Club", code: "FC", cover: "../../../assets/images/default-image.png", logo: "../../../assets/images/default-image.png" }
      ],
      tournament: {
        desc: "infor",
        end_at: "12/12/1993",
        group_number: 4,
        name: "infor",
        start_at: "12/12/1993"
      }
    }
    this.apiService.post([END_POINT.tournaments], dataTemp).subscribe(tournamentId => {
      this.router.navigate(['schedules', tournamentId]);
    });
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
    this.resetForm();
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
