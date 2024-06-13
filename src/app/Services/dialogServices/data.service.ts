import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any;

  constructor() { }

  setData(data: any) {
    this.data = data;
  }

  getData() {
    const temp = this.data;
    this.data = undefined; //   إزالة البيانات بعد الحصول عليها
    return temp;
  }
}
