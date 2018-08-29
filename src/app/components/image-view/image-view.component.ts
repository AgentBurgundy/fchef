import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  @Input()
  imageUrl: string;

  constructor() {
  }

  ngOnInit() {

  }

}
