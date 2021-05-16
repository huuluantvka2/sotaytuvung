import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  @ViewChild("imageInput") imageInput: ElementRef;
  constructor(
    private router: Router
  ) { }
  ngOnInit(): void {
  }
  selectedFile: any
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event) => {
        this.selectedFile = event.target.result;
        localStorage.setItem("bgImage", JSON.stringify({ bgImage: this.selectedFile }))
        document.getElementById("body-bg").style.backgroundImage = "url('" + this.selectedFile + "')"
      }
    }
  }
  open() {
    this.imageInput.nativeElement.click()
  }
}
