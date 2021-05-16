import { Injectable } from '@angular/core';
import { ActionSheetOption, ActionSheetOptions } from '@capacitor/core';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class NewwordService {

  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  /**
   * @input : {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        }
   */
  alertInput(header: string, subHeader: string, message: string, inputs: any) {
    return new Promise<any>((resolve, reject) => {
      let options = {
        cssClass: "custom-css-input",
        header: header,
        subheader: subHeader,
        message: message,
        inputs: inputs,
        buttons: [
          {
            text: 'Hủy',
            cssClass: 'vh-pink',
            handler: () => {
              resolve({ role: 'cancel' })
            }
          }, {
            text: 'Ok',
            cssClass: 'vh-pink',
            handler: (value) => {
              resolve({ role: 'ok', value: value })
            }
          }
        ]
      }
      this.alertCtrl.getTop().then(res => {
        if (res) this.alertCtrl.dismiss()
        else this.alertCtrl.create(options).then(alert => {
          alert.present()
        })
      })
    })
  }
  showToast(time: number, message: string, cssClass: 'success' | 'error' | 'normal' = 'success') {
    return new Promise<any>((resolve, rejects) => {
      this.toastCtrl.create({
        duration: time,
        message: message,
        cssClass: cssClass
      }).then(res => res.present())
    })
  }
  sortDateDESC(array: Array<any> = []) {
    return array.sort((a, b) => { return new Date(b.date).valueOf() - new Date(a.date).valueOf() })
  }
  sortDateASC(array: Array<any> = []) {
    return array.sort((a, b) => { return new Date(a.date).valueOf() - new Date(b.date).valueOf() })
  }
  /**
   * 
   * @returns 
   */
  showActionSheet(header: string, buttons: any, cssClass: "action-sheet-red" | "action-sheet-green" | "action-sheet-black" = "action-sheet-black") {
    return new Promise<any>((resolve, reject) => {
      let options: any = {
        header: header,
        id: 'new-word',
        cssClass: 'vh-white',
        mode: "ios",
        backdropDismiss: true,
        buttons: buttons.map(item => {
          return {
            ...item,
            handler: () => {
              resolve(item.value());
            }
          }
        })
      }
      this.actionSheetCtrl.getTop().then(res => {
        if (res) this.actionSheetCtrl.dismiss()
        else {
          this.actionSheetCtrl.create(options).then(action => {
            action.present();
          })
        }
      })
    })
  }
  changAlias(str: string) {
    return str.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }
  searchForArray(keySearch: string, array: Array<any>, fields: Array<any>) {
    let result = array.filter(item => {
      let exist: boolean = false
      for (let field of fields) {
        if (this.changAlias(item[field].toLowerCase()).indexOf(keySearch) >= 0) {
          exist = true
          break;
        }
      }
      return exist
    })
    return result
  }
}
