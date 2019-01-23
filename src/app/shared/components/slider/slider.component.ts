import { Component, ElementRef, ViewChild, Renderer, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewChecked {
  @ViewChild("slide", { read: ElementRef }) slide: ElementRef;
  @ViewChild("dot", { read: ElementRef }) dot: ElementRef;
  
  slideIndex = 0

  constructor(private renderer: Renderer) {}

  ngAfterViewChecked() {
    this.showSlides();
  }
  
  showSlides() {
    let slides = this.slide.nativeElement.children;
    let dots = this.dot.nativeElement.children;
    for (let i = 0; i < slides.length - 1; i++) {
      this.renderer.setElementAttribute(slides[i], "style", "display: none");
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length - 1) {
      this.slideIndex = 1;
    }
    for (let i = 0; i < dots.length; i++) {
      this.renderer.setElementAttribute(dots[i], "class", "dot");
    }
    this.renderer.setElementAttribute(slides[this.slideIndex - 1], "style", "display: block");
    this.renderer.setElementClass(dots[this.slideIndex - 1], "active-dot", true);
    setTimeout(() => this.showSlides, 3000);
  }
}
