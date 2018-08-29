import { Component, OnInit, Input } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

  @Input()
  imageUrl: string;

  imageData: any;

  constructor(private http: Http, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
   this.http.get(this.imageUrl, {
      responseType: ResponseContentType.Blob
    })
      .toPromise()
      .then((res: any) => {
        let blob = new Blob([res._body], {
          type: res.headers.get("Content-Type")
        });

        let urlCreator = window.URL;
        this.imageData = this.sanitizer.bypassSecurityTrustUrl(
            urlCreator.createObjectURL(blob));
      });
  }

}
