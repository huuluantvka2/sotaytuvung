import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Từ vựng';
  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.router.navigate(['/mobile'])
  }
  urlBase64: string = ''
  image: any;
  ngOnInit() {
    this.initBg()
    this.initData()
  }

  initBg() {
    let isBackground = localStorage.getItem("bgImage");
    if (isBackground) this.urlBase64 = JSON.parse(isBackground).bgImage
    else this.urlBase64 = '../assets/background/bg.jpg'
    document.getElementById("body-bg").style.backgroundImage = "url('" + this.urlBase64 + "')"
  }
  initData() {
    if (!localStorage.getItem("topicNewWord")) {
      localStorage.setItem("topicNewWord", JSON.stringify([{
        _id: uuidv4(),
        topic: "Chủ đề mẫu",
        date: new Date().toISOString()
      }]))
    }
  }
}
