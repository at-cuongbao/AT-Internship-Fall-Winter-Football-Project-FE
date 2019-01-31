import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Team } from './../../shared/models/team';
import { TransfereService } from './../../shared/services/transfere.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { END_POINT } from './../../shared/services/api-registry';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-team-registration',
  templateUrl: './team-registration.component.html',
  styleUrls: ['./team-registration.component.scss']
})
export class TeamRegistrationComponent implements OnInit {

  imageUrl ='assets/images/default-image.png';
  imageLogo = this.imageUrl;
  imageCover = this.imageUrl;
  fileToUploadLogo: File = null;
  fileToUploadCover: File = null;
  team: Team = new Team();

  constructor(
    private api: ApiService,
    private transfere: TransfereService,
    // public dialogRef: MatDialogRef<TeamRegistrationComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  ngOnInit() {
    
  }

  handleFileInput(file: FileList) {
    this.fileToUploadLogo = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageLogo = event.target.result;
    }

    reader.readAsDataURL(this.fileToUploadLogo);
  }

  handleFileInput2(file: FileList) {
    this.fileToUploadCover = file.item(0);

    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageCover = event.target.result;
    }
    
    reader.readAsDataURL(this.fileToUploadCover);
  }

  onSubmit(f: NgForm) {
    this.team.name = f.control.value.name;
    this.team.nickName = f.control.value.nickName;
    this.team.logo = this.fileToUploadLogo ? this.fileToUploadLogo.name : '';
    this.team.cover = this.fileToUploadCover ? this.fileToUploadCover.name : '';
    console.log(this.team);
    console.log(this.fileToUploadLogo);
    
    // this.uploadFile();
    // this.transfere.setData(this.team);
    // this.dialogRef.close({
    //   team: this.team,
    //   urlLogo: this.fileToUploadLogo
    // });
  }

  uploadFile() {
    const fd = new FormData();
    fd.append('image', this.fileToUploadLogo, this.fileToUploadLogo.name);
    this.api.post(["http://localhost:4200/assets/images"], fd);
    // fd.append('image', this.fileToUploadCover, this.fileToUploadCover.name);
    // this.api.post([this.api.local + "/assets/images"], fd);
  }
}
