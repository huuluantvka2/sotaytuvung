import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NewwordService } from 'src/app/service/newword.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  wordForm: FormGroup;
  topic = this.router.getCurrentNavigation().extras.state.topic
  wordDetail = this.router.getCurrentNavigation().extras.state.wordDetail
  list_words = JSON.parse(localStorage.getItem("list_words"))
  constructor(
    private router: Router,
    private newWord: NewwordService,
    private navCtrl: NavController
  ) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.wordForm = new FormGroup({
      enWord: new FormControl(this.wordDetail.enWord, Validators.required),
      vnWord: new FormControl(this.wordDetail.vnWord, Validators.required),
      example: new FormControl(this.wordDetail.example)
    })
  }
  updateWord(value) {
    if (this.wordForm.valid) {
      this.wordDetail = {
        ...this.wordDetail,
        ...value
      }
      let index = this.list_words.findIndex(item => item._id == this.wordDetail._id)
      this.list_words[index] = this.wordDetail
      localStorage.setItem("list_words", JSON.stringify(this.list_words))
    }
  }
  deleteWord() {
    let index = this.list_words.findIndex(item => item._id == this.wordDetail._id)
    if (index >= 0) {
      this.list_words.splice(index, 1)
      localStorage.setItem("list_words", JSON.stringify(this.list_words))
      this.navCtrl.pop()
      this.newWord.showToast(2000, "Xóa từ vựng thành công")
    }
  }
}
