import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Team } from './../../shared/models/team';
import { TransfereService } from './../../shared/services/transfere.service';
import { Router } from '@angular/router';

// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


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

  // constructor(private transfere: TransfereService, private router: Router) { }
  constructor(
    // private api: ApiService,
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
    this.transfere.setData(this.team);
    // this.router.navigateByUrl('/tounament-registration');
    // this.dialogRef.close();
  }

}
