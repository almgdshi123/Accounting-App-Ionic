import { Injectable } from '@angular/core';
import { ApiProviderService } from './api-provider.service';
import { DialogService } from './dialogServices/dialog.service';
import { ResponseCode } from '../enum/ELookup';

@Injectable({
  providedIn: 'root'
})
export class ProcesseProviderService {
  dataResponse: any;
  constructor(private api: ApiProviderService ,private dialog: DialogService) { }
  async getListAsString(url: string): Promise<any> {
    try {
      this.dialog.showLoading();
   await this.api.getData(url).then(data => {
        this.dataResponse = data;
      });
      if (!this.ResponseCodeServer(this.dataResponse.Code)) {
        throw new Error('خطأ في السيرفر'); 
      }
    } catch (error) {
      this.dialog.alertShowError('خطأ', 'تأكد من اتصالك بالإنترنت');
    } finally {
      this.dialog.hideLoading();

    }
    return this.dataResponse.Data;

  }
  async  add(url: string, data: any,message:string): Promise<any> {
    try {

      this.dialog.showLoading();
      await this.api.postData(url, data).then(data => {
        this.dataResponse = data;
      });
      if (!this.ResponseCodeServer(this.dataResponse.Code)) {

        throw new Error('خطأ في السيرفر'); 
      }else{
        this.dialog.alertShowSuccess('نجاح', message);
      }
    } catch (error) {
      console.log(error)
      this.dialog.alertShowError('خطأ', 'تأكد من اتصالك بالإنترنت');
    } finally {
      this.dialog.hideLoading();
    }
    return this.dataResponse;
  }
  
  ResponseCodeServer(code: number): boolean {
    return code === ResponseCode.Success;
  }
  
}
