import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const baseUrl = 'http://desktop-tcq1ieo:8024/api/';
@Injectable({
  providedIn: 'root',
})
export class ApiProviderService {
  constructor(private https: HttpClient) {}

  getData(url) {
    return new Promise((resolve, reject) => {
      this.https.get(baseUrl + url).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          console.error(error); // Use console.error for errors
          reject(error);
        }
      );
    });
  }

  getListAsString(url) {
    return new Promise((resolve, reject) => {
      this.https.get(baseUrl + url).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          console.error(error); // Use console.error for errors
          reject(error);
        } 
      );
    }); 
  }

  postDataList(content, url) {
    return new Promise((resolve, reject) => {
      this.https.post(baseUrl + url, content).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          console.error(error); // Use console.error for errors
          reject(error);
        } 
      );
    });
  }
  deleteData(url) {
    return new Promise((resolve, reject) => {
      this.https.delete(baseUrl + url).subscribe((res) => {
        resolve(res);
      },
      (error) => {
        console.error(error); // Use console.error for errors
        reject(error);
      } ); 
      });
  }
  postData(content,url){
    return new Promise((resolve, reject) => {
      this.https.post(baseUrl + url, content).subscribe((res) => {
        resolve(res);
      },
      (error) => {
        console.error(error); // Use console.error for errors
        reject(error);
      } );  
    })  }
    

  

  
}
