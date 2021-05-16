import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewwordService } from 'src/app/service/newword.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  constructor(
    private newWord: NewwordService,
    private router: Router
  ) { }
  topics: Array<any> = []
  topicsShow: Array<any> = []
  ngOnInit(): void {
    this.getDataLocal()
  }
  addTopic() {
    let arr: Array<any> = [{ name: 'topic', type: 'text', placeholder: 'Nhập tên chủ đề...' }]
    this.newWord.alertInput("Thêm chủ đề", "", "", arr).then((res) => {
      if (res.value) {
        let data = {
          _id: uuidv4(),
          date: new Date().toISOString(),
          topic: res.value.topic
        }
        this.topicsShow.unshift(data)
        localStorage.setItem("topicNewWord", JSON.stringify(this.topicsShow))
        this.newWord.showToast(2000, "Thêm chủ đề thành công ^^")
        this.getDataLocal()
      }
    }).catch(() => { })
  }
  getDataLocal() {
    let topics = localStorage.getItem("topicNewWord");
    if (topics) this.topics = this.newWord.sortDateDESC(JSON.parse(topics))
    this.topicsShow = this.topics;
  }
  openActionSheet(item) {
    let buttons = [
      { text: 'Xem danh sách từ vựng', icon: 'heart', cssClass: 'action-sheet-green', value: () => this.viewNewWord(item) },
      { text: 'Sửa tên chủ đề', icon: 'create-outline', cssClass: 'action-sheet-black', value: () => this.editTopic(item) },
      { text: 'Xóa chủ đề', icon: 'trash', cssClass: 'action-sheet-red', value: () => this.deleteTopic(item) }
    ]
    this.newWord.showActionSheet("Lựa chọn", buttons).then(res => {
    })
  }
  deleteTopic(item) {
    if (JSON.parse(localStorage.getItem("list_words")).filter(data => data.id_topic == item._id).length) {
      this.newWord.showToast(2000, "Không thể xóa chủ đề do trong chủ đề này đã có từ vựng !", "error")
    } else {
      let index = this.topicsShow.findIndex(data => data._id == item._id)
      if (index >= 0) this.topicsShow.splice(index, 1)
      localStorage.setItem("topicNewWord", JSON.stringify(this.topicsShow))
      this.newWord.showToast(2000, "Xóa chủ đề thành công ^^")
    }
  }
  editTopic(item) {
    let arr: Array<any> = [{ name: 'topic', type: 'text', value: item.topic, placeholder: 'Nhập tên chủ đề...' }]
    this.newWord.alertInput("Sửa chủ đề", "", "", arr).then(res => {
      if (res.value && res.value.topic.trim().length) {
        let index = this.topicsShow.findIndex(data => data._id == item._id)
        if (index >= 0) this.topicsShow[index]['topic'] = res.value.topic
        localStorage.setItem("topicNewWord", JSON.stringify(this.topicsShow))
        this.newWord.showToast(2000, "Sửa chủ đề thành công ^^")
        this.getDataLocal()
      }
    })
  }
  viewNewWord(item) {
    this.router.navigate(['/mobile/topics/list'], { state: { topic: item } })
  }
}
