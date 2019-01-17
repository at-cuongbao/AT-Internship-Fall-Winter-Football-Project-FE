import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Team } from './../../shared/models/team';

@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.scss']
})
export class TeamRegistrationComponent implements OnInit {

  imageUrl ='assets/images/default-image.png';
  imageLogo = this.imageUrl;
  imageCover = this.imageUrl;
  fileToUpload: File = null;
  team: Team = new Team();

  constructor() { }

  ngOnInit() {

  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageLogo = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  handleFileInput2(file: FileList) {
    this.fileToUpload = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageCover = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  submit(f: NgForm) {
    this.team.name = f.control.value.name;
    this.team.nickName = f.control.value.nickName;
    this.team.logo = f.control.value.logo;
    this.team.cover = f.control.value.cover;
    console.log(this.team);
  }

}
