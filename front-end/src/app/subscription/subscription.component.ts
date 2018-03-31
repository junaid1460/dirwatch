import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AppService } from '../app.service'
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  days:number = 1;
  add(){
    this.days += 1;
  }
  remove(){
    this.days -=1
    this.days = this.days < 1? 1:this.days;
  }
  constructor(public aps:AppService, private dl: MatDialog) { 
    // aps.fetch()
  }
  xs = [0,]
  ngOnInit() {
  }

  show(image){
    this.dl.open(ImageDialog, {data : {
      image: image
    }})
  }

}



@Component({
  selector: 'image-dialog',
  template: `
    <img src="{{data.image}}" style=" max-height:80vh;max-width:60vw"/>
  `
})
export class ImageDialog {

  constructor(
    public dialogRef: MatDialogRef<ImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}