import { Injectable } from '@angular/core';
import { Http } from '@angular/http'

@Injectable()
export class AppService {
  hash = 'random'
  files =[]
  constructor(private http: Http) { 
    this.fetch()
  }
  fetch(){
    // console.log('/pics/' + this.hash)
    this.http.get('/pics/' + this.hash).subscribe(e =>{
      let tmp = e.json()
      if(tmp.hash){
        this.hash = tmp.hash
        this.files = tmp.files;
      }
      setTimeout(this.fetch.bind(this), 1000)
      
    })
  }
}
