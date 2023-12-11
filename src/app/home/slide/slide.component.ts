import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    const script = this.renderer.createElement('script');
    script.src = 'assets/js/index.js';
    this.renderer.appendChild(document.body, script);
  }

}
