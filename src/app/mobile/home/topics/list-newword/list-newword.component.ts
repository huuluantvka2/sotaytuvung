import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NewwordService } from 'src/app/service/newword.service';

@Component({
  selector: 'app-list-newword',
  templateUrl: './list-newword.component.html',
  styleUrls: ['./list-newword.component.scss']
})
export class ListNewwordComponent {
  topic = this.router.getCurrentNavigation().extras.state.topic
  showSearch: boolean = false;
  list_words: Array<any> = []
  list_words_show: Array<any> = []
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private newWord: NewwordService
  ) { }

  ionViewWillEnter(): void {
    this.getData()
  }
  getData() {
    if (localStorage.getItem("list_words")) {
      let list_words = JSON.parse(localStorage.getItem("list_words")).filter(item => item.id_topic == this.topic._id)
      this.list_words = this.newWord.sortDateDESC(list_words)
      this.list_words_show = this.list_words;
    }

  }
  cancelSearch() {
    this.showSearch = false;
  }
  openSort() {
    let buttons = [
      { text: 'Mới nhất', cssClass: 'action-sheet-green', value: () => this.sortWord("new") },
      { text: 'Cũ nhất', cssClass: 'action-sheet-black', value: () => this.sortWord("old") },
    ]
    this.newWord.showActionSheet("Sắp xếp", buttons).then(res => {
    })
  }
  sortWord(type: "new" | "old") {
    if (type == "new") this.list_words_show = this.newWord.sortDateDESC(this.list_words)
    else this.list_words_show = this.newWord.sortDateASC(this.list_words)
  }
  addWord() {
    this.router.navigate(['/mobile/topics/list/add'], { state: { topic: this.topic } })
  }
  searchWord(search: string) {
    if (search.trim().length) {
      let val: string = this.newWord.changAlias(search.trim().toLowerCase());
      this.list_words_show = this.newWord.searchForArray(val, this.list_words, ['vnWord', 'enWord'])
      console.log(this.list_words_show);
    }
    else this.list_words_show = this.list_words
  }
  gotoDetail(item) {
    this.router.navigate(['/mobile/topics/list/detail'], { state: { topic: this.topic, wordDetail: item } })
  }
}
