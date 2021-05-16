import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NewwordService } from 'src/app/service/newword.service';
import { v4 as uuidv4 } from 'uuid';
interface NewWord {
  vhWord: string,
  enWord: string,
  example: string,
  date: Date,
  id_topic: string,
  _id: string
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  wordForm: FormGroup;
  topic = this.router.getCurrentNavigation().extras.state.topic
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
      enWord: new FormControl("", Validators.required),
      vnWord: new FormControl("", Validators.required),
      example: new FormControl("")
    })
  }
  submitForm() {
    let data: NewWord = {
      ...this.wordForm.value,
      date: new Date().toISOString(),
      _id: uuidv4(),
      id_topic: this.topic._id
    }
    let list_words = JSON.parse(localStorage.getItem("list_words"))
    if (!list_words) localStorage.setItem("list_words", JSON.stringify([data]))
    else {
      list_words.push(data);
      localStorage.setItem("list_words", JSON.stringify(list_words))
    }
    this.newWord.showToast(2000, "Thêm từ thành công")
    this.navCtrl.pop();
  }
}
