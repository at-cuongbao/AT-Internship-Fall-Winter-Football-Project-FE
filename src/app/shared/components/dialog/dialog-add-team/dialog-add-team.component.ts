import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Team } from 'src/app/shared/models/team';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-add-team',
  templateUrl: './dialog-add-team.component.html',
  styleUrls: ['./dialog-add-team.component.scss']
})
export class DialogAddTeamComponent {

  @Input() team: Team;
  @Output() submit = new EventEmitter();

  handleFileInput(file: FileList, isForLogo = true) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      if (isForLogo) {
        this.team.logo = event.target.result;
      } else {
        this.team.cover = event.target.result;
      }
    }
    reader.readAsDataURL(file.item(0));
  }

  closeModal(team) {
    this.submit.emit(team);
  }

  onSubmit(form: NgForm) {
    const formControl = form.control.value;
    const urlImg = '../../../assets/images/';
    this.team.name = formControl.name;
    this.team.code = formControl.code;
    if (formControl.cover) this.team.cover = urlImg + formControl.cover.slice(12);
    if (formControl.logo) this.team.logo = urlImg + formControl.logo.slice(12);
    this.closeModal(this.team);
  }
}
