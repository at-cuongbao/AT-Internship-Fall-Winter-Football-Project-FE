import { Component, OnInit, Input, OnChanges, Renderer, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-next-match',
  templateUrl: './next-match.component.html',
  styleUrls: ['./next-match.component.scss']
})
export class NextMatchComponent implements OnInit, OnChanges {

  @Input("match") match = {};
  _match = {};
  @ViewChild("modal", { read: ElementRef }) modal: ElementRef;

  constructor(
    private auth: AuthService,
    private router: Router,
    private renderer: Renderer
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  openModal(match) {
    if (!this.auth.isLoggedIn()) {
      return this.router.navigate(['/login'], { queryParams: {
        returnUrl: this.router.url
      }})
    }
    this._match = match;
    this.renderer.setElementAttribute(this.modal.nativeElement, "style", "display: block");
  }

  closeModal() {
    this.renderer.setElementAttribute(this.modal.nativeElement, "style", "display: none");
  }
}
